import WelcomeEmail from "@/components/email/welcome";
import { transporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    await transporter.sendMail({
      from: "aurelien.r35@gmail.com",
      to: email,
      subject: "Création de votre compte Limpa Car",
      html: render(WelcomeEmail({ name })),
    });

    return NextResponse.json("Email envoyé");
  } catch (error) {
    console.log("[EMAIL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
