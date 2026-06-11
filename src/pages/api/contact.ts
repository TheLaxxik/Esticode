import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

type RecaptchaVerificationResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

const resendApiKey = import.meta.env.RESEND_API_KEY;
const recaptchaSecretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

function getTextField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmailHtml(data: {
  meno: string;
  email: string;
  firma: string;
  rozpocet: string;
  termin: string;
  typWebu: string;
  sprava: string;
}) {
  const rows = [
    ['Meno', data.meno],
    ['Email', data.email],
    ['Firma', data.firma || '—'],
    ['Rozpočet', data.rozpocet || '—'],
    ['Termín', data.termin || '—'],
    ['Typ projektu', data.typWebu || '—']
  ]
    .map(([label, value]) => `<div class="field"><span>${label}</span><p>${escapeHtml(value)}</p></div>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-inline-size: 600px; margin: 0 auto; background: #111; border-radius: 8px; overflow: hidden; }
        .header { background: #111; padding: 30px; text-align: center; border-block-end: 2px solid #333; }
        .header img { block-size: 40px; }
        .body { padding: 30px; color: #eee; }
        .body h2 { color: #fff; margin-block-start: 0; }
        .field { margin-block-end: 16px; }
        .field span { color: #aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-block-end: 4px; }
        .field p { color: #fff; margin: 0; font-size: 15px; }
        .divider { border: none; border-block-start: 1px solid #333; margin: 24px 0; }
        .message-box { background: #1a1a1a; border-inline-start: 3px solid #fff; padding: 16px; border-radius: 4px; color: #eee; white-space: pre-wrap; }
        .footer { padding: 20px 30px; text-align: center; color: #555; font-size: 12px; border-block-start: 1px solid #222; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://esticode.sk/img/Logo_White.svg" alt="Esticode">
        </div>
        <div class="body">
          <h2>Nový dopyt z esticode.sk</h2>
          ${rows}
          <hr class="divider">
          <div class="field"><span>Správa</span></div>
          <div class="message-box">${escapeHtml(data.sprava)}</div>
        </div>
        <div class="footer">esticode.sk — tento mail bol vygenerovaný automaticky</div>
      </div>
    </body>
    </html>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  if (!resend) {
    return json({ success: false, error: 'Server nie je nakonfigurovaný na odosielanie e-mailov.' }, 500);
  }

  if (!recaptchaSecretKey) {
    return json({ success: false, error: 'Server nie je nakonfigurovaný na overovanie reCAPTCHA.' }, 500);
  }

  try {
    const formData = await request.formData();

    const meno = getTextField(formData, 'meno');
    const email = getTextField(formData, 'email');
    const firma = getTextField(formData, 'firma');
    const rozpocet = getTextField(formData, 'rozpocet');
    const termin = getTextField(formData, 'termin');
    const typWebu = getTextField(formData, 'typ-webu');
    const sprava = getTextField(formData, 'sprava');
    const recaptchaToken = getTextField(formData, 'recaptcha_token') || getTextField(formData, 'recaptchaToken');

    if (!meno || !email || !rozpocet || !termin || !typWebu || !sprava || !recaptchaToken) {
      return json({ success: false, error: 'Chýbajú povinné polia alebo reCAPTCHA token.' }, 400);
    }

    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: recaptchaSecretKey,
        response: recaptchaToken
      })
    });

    if (!verifyResponse.ok) {
      return json({ success: false, error: 'Nepodarilo sa overiť reCAPTCHA.' }, 502);
    }

    const verification = (await verifyResponse.json()) as RecaptchaVerificationResponse;
    const score = verification.score ?? 0;

    if (!verification.success || score < 0.5) {
      return json(
        {
          success: false,
          error: 'Formulár bol vyhodnotený ako podozrivý.',
          botDetected: true
        },
        403
      );
    }

    await resend.emails.send({
      from: 'Esticode <info@esticode.sk>',
      to: 'info@esticode.sk',
      subject: `Nový dopyt od ${meno.replace(/\s+/g, ' ').slice(0, 100)}`,
      replyTo: email,
      html: buildEmailHtml({
        meno,
        email,
        firma,
        rozpocet,
        termin,
        typWebu,
        sprava
      })
    });

    return json({ success: true }, 200);
  } catch (error) {
    console.error(error);
    return json({ success: false, error: 'Chyba pri odosielaní.' }, 500);
  }
};

    if (!meno || !email || !sprava) {
      return new Response(JSON.stringify({ error: 'Chýbajú povinné polia.' }), { status: 400 });
    }

    await resend.emails.send({
      from: 'Esticode <info@esticode.sk>',
      to: 'info@esticode.sk',
      subject: `Nový dopyt od ${meno}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-inline-size: 600px; margin: 0 auto; background: #111; border-radius: 8px; overflow: hidden; }
            .header { background: #111; padding: 30px; text-align: center; border-block-end: 2px solid #333; }
            .header img { block-size: 40px; }
            .body { padding: 30px; color: #eee; }
            .body h2 { color: #fff; margin-block-start: 0; }
            .field { margin-block-end: 16px; }
            .field span { color: #aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-block-end: 4px; }
            .field p { color: #fff; margin: 0; font-size: 15px; }
            .divider { border: none; border-block-start: 1px solid #333; margin: 24px 0; }
            .message-box { background: #1a1a1a; border-inline-start: 3px solid #fff; padding: 16px; border-radius: 4px; color: #eee; }
            .footer { padding: 20px 30px; text-align: center; color: #555; font-size: 12px; border-block-start: 1px solid #222; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://esticode.sk/img/Logo_White.svg" alt="Esticode">
            </div>
            <div class="body">
              <h2>Nový dopyt z esticode.sk</h2>
              <div class="field"><span>Meno</span><p>${meno}</p></div>
              <div class="field"><span>Email</span><p>${email}</p></div>
              <div class="field"><span>Firma</span><p>${firma || '—'}</p></div>
              <div class="field"><span>Rozpočet</span><p>${rozpocet || '—'}</p></div>
              <div class="field"><span>Termín</span><p>${termin || '—'}</p></div>
              <div class="field"><span>Typ projektu</span><p>${typWebu || '—'}</p></div>
              <hr class="divider">
              <div class="field"><span>Správa</span></div>
              <div class="message-box">${sprava}</div>
            </div>
            <div class="footer">esticode.sk — tento mail bol vygenerovaný automaticky</div>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Chyba pri odosielaní.' }), { status: 500 });
  }
};