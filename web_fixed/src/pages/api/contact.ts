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
      html: `
        <h2>Nový dopyt z esticode.sk</h2>
        <p><strong>Meno:</strong> ${meno}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Firma:</strong> ${firma || '—'}</p>
        <p><strong>Rozpočet:</strong> ${rozpocet || '—'}</p>
        <p><strong>Termín:</strong> ${termin || '—'}</p>
        <p><strong>Typ projektu:</strong> ${typWebu || '—'}</p>
        <hr/>
        <p><strong>Správa:</strong></p>
        <p>${sprava}</p>
      `,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Chyba pri odosielaní.' }), { status: 500 });
  }
};