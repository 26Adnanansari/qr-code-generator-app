import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { qrData } = req.body;

  if (!qrData || !Array.isArray(qrData)) {
    return res.status(400).json({ message: "Invalid qrData format" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Use environment variables
      pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "26adnanansari@gmail.com",
    subject: "Generated QR Codes Data",
    text: `Here are the QR Codes Data: \n${qrData.join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Failed to send email", error });
  }
}
