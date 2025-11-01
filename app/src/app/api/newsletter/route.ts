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

    const subject = "[NOUVEL INSCRIT] — Newsletter Immobilier Finistère";
    const content = `Nouvelle inscription à la newsletter locale.

Email : ${email}
Source : Section "Analyses du marché immobilier"
Tag : lead_newsletter_immobilier`;

    await sendInternalEmail(subject, content);

    return NextResponse.json(
      { 
        success: true,
        message: "✅ Merci, vous êtes inscrit.\nVous recevrez bientôt les prochaines analyses du marché."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}

