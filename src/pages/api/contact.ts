import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { meno, email, firma, rozpocet, termin, typWebu, sprava } = data;

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