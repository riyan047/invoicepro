import prisma from "@/app/utils/db";
import { requierUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const session = await requierUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });
    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "InvoicePro@riyang.co.in",
      name: "InvoicePro",
    };
    const recipients = [
      {
        email: invoiceData.clientEmail,
      },
    ];

    emailClient.send({
      from: sender,
      to: recipients,
      subject: "Reminder Invoice Payment",
      text: "Hey you forgot to pay the invoice.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: "true" });
}
