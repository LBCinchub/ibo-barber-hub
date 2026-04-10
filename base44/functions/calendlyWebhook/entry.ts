import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const eventType = body?.event;
    const payload = body?.payload;

    if (!payload) {
      return Response.json({ error: 'No payload' }, { status: 400 });
    }

    const clientName = payload?.name || payload?.invitee?.name || 'Client inconnu';
    const clientEmail = payload?.email || payload?.invitee?.email || '';
    const service = payload?.event_type?.name || payload?.event?.name || '';
    const startTime = payload?.event?.start_time || payload?.scheduled_event?.start_time || '';
    const calendlyEventId = payload?.event?.uuid || payload?.scheduled_event?.uuid || '';
    const isCancelled = eventType === 'invitee.canceled';

    // Save booking to DB
    await base44.asServiceRole.entities.Booking.create({
      client_name: clientName,
      client_email: clientEmail,
      service,
      start_time: startTime,
      status: isCancelled ? 'cancelled' : 'confirmed',
      calendly_event_id: calendlyEventId,
    });

    // Send email notification
    const subject = isCancelled
      ? `❌ Annulation — ${clientName}`
      : `📅 Nouveau RDV — ${clientName}`;

    const bodyHtml = isCancelled
      ? `<p>Le client <strong>${clientName}</strong> (${clientEmail}) a annulé son rendez-vous.<br/>Service: ${service}<br/>Heure: ${startTime}</p>`
      : `<p>Nouveau rendez-vous confirmé !<br/><strong>Client :</strong> ${clientName}<br/><strong>Email :</strong> ${clientEmail}<br/><strong>Service :</strong> ${service}<br/><strong>Heure :</strong> ${new Date(startTime).toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</p>`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'IBOBarber3@gmail.com',
      from_name: 'IBO Barber — Notifications',
      subject,
      body: bodyHtml,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});