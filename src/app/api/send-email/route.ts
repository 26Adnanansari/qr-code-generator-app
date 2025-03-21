import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { qrData } = await req.json();

    if (!qrData || !Array.isArray(qrData)) {
      return NextResponse.json({ message: "Invalid qrData format" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Environment variable
        pass: process.env.GMAIL_APP_PASSWORD, // App Password
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "26adnanansari@gmail.com",
      subject: "Generated QR Codes Data",
      text: `Here are the QR Codes Data: \n${qrData.join("\n")}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}
