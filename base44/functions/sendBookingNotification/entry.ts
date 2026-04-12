import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { bookingId, action } = await req.json();

    if (!bookingId || !action) {
      return Response.json({ error: 'Missing bookingId or action' }, { status: 400 });
    }

    // Fetch booking details
    const booking = await base44.asServiceRole.entities.Booking.get(bookingId);
    if (!booking) {
      return Response.json({ error: 'Booking not found' }, { status: 404 });
    }

    const { client_name, client_email, service, start_time } = booking;

    let subject, body;

    if (action === 'confirmed') {
      subject = 'Your IBO Barber Booking is Confirmed!';
      body = `
        <h2>Booking Confirmed</h2>
        <p>Hi ${client_name},</p>
        <p>Your booking has been confirmed!</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date & Time:</strong> ${start_time}</li>
        </ul>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br/>IBO Barber Team</p>
      `;
    } else if (action === 'rejected') {
      subject = 'IBO Barber Booking Update';
      body = `
        <h2>Booking Status Update</h2>
        <p>Hi ${client_name},</p>
        <p>Unfortunately, we are unable to confirm your booking at this time.</p>
        <p>Service: ${service}<br/>Requested: ${start_time}</p>
        <p>Please feel free to reach out to book another time.</p>
        <p>Best regards,<br/>IBO Barber Team</p>
      `;
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Send email
    await base44.integrations.Core.SendEmail({
      to: client_email,
      subject,
      body,
    });

    return Response.json({ success: true, message: `Email sent to ${client_email}` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});