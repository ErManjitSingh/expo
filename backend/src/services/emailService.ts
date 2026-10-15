import nodemailer from 'nodemailer';
import { env } from '../config/env';

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; reason?: string }> {
  if (!env.smtp.host || !env.smtp.user) {
    console.log('[emailService] SMTP not configured. Skipping send:', options.subject);
    return { sent: false, reason: 'SMTP not configured' };
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });

  await transporter.sendMail({
    from: env.smtp.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  return { sent: true };
}

export async function notifyEnquiryEmail(enquiry: {
  name: string;
  email: string;
  phone: string;
  destination?: string;
}): Promise<void> {
  await sendEmail({
    to: enquiry.email,
    subject: 'We received your enquiry — ExploreMyBharat',
    html: `<p>Hi ${enquiry.name},</p><p>Thanks for reaching out to ExploreMyBharat. Our travel expert will contact you shortly regarding ${enquiry.destination || 'your trip'}.</p><p>— ExploreMyBharat Team</p>`,
  });
}
