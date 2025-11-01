import { NextRequest, NextResponse } from "next/server";
import { sendInternalEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    const subject = "[NOUVEL ACCÈS PRIVÉ] — Guides & Ressources Immobilier Finistère";
    const content = `Nouvelle demande d'accès privé aux ressources.

Email : ${email}
Source : Section "Accès privé – Ressources Finistère"
Tag : lead_guides_prives`;

    await sendInternalEmail(subject, content);

    return NextResponse.json(
      { 
        success: true,
        message: "🔒 Merci, accès prioritaire confirmé.\nVous serez notifié dès qu'une ressource sera disponible."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending private access email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}

