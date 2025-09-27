/ * eslint-env node */;
import nodemailer from 'nodemailer';
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const {
      firstName,
      surname,
      email,
      phone,
      message,
      event,
      rental,
      sendTo,
      referral,
    } = await req.json();

    const sanitize = (v) => {
      if (typeof v !== 'string') return '';
      return v.replace(/\*?undefined|\*?null/g, '').trim();
    };
    const sanitizedEvent = sanitize(event);
    const sanitizedRental = sanitize(rental);
    const combinedEventRental = [sanitizedEvent, sanitizedRental]
      .filter(Boolean)
      .join(' ');

    let recipientEmail;
    if (sendTo === 'karin') {
      recipientEmail = process.env.KARIN_EMAIL;
    } else if (sendTo === 'cecilia') {
      recipientEmail = process.env.CECILIA_EMAIL;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid recipient' }), {
        status: 400,
      });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: email,
      to: recipientEmail,
      subject: `Intresseanmälan: ${combinedEventRental}`,
      text: `
        Förnamn: ${firstName}
        Efternamn: ${surname}
        Email: ${email}
        Telefon: ${phone}
        Vart hörde du om oss?: ${referral}
        
        Meddelande:
        ${message}
      `,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
