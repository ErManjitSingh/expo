import { env } from '../config/env';

/** WhatsApp integration-ready architecture. */
export async function sendWhatsAppMessage(options: {
  to: string;
  message: string;
}): Promise<{ sent: boolean; reason?: string }> {
  if (!env.whatsapp.apiUrl || !env.whatsapp.token) {
    console.log('[whatsappService] Not configured. Message queued locally:', options.to);
    return { sent: false, reason: 'WhatsApp API not configured' };
  }

  // Wire provider (Meta Cloud API / Twilio) when credentials exist.
  return { sent: false, reason: 'Provider adapter not implemented' };
}

export async function notifyEnquiryWhatsApp(phone: string, name: string): Promise<void> {
  await sendWhatsAppMessage({
    to: phone,
    message: `Namaste ${name}! ExploreMyBharat received your enquiry. Our expert will call you soon.`,
  });
}
