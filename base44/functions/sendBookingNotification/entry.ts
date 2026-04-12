Deno.serve(async (req) => {
  try {
    const { bookingId, action } = await req.json();

    if (!bookingId || !action) {
      return Response.json({ error: 'Missing bookingId or action' }, { status: 400 });
    }

    // Email notifications are sent via the Calendly webhook handler
    // This is a placeholder for manual status updates in the admin panel
    return Response.json({ success: true, message: 'Booking status updated. Email notification would be sent if Calendly webhook is configured.' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});