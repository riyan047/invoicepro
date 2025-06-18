import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const { invoiceId } = await params;

    const session = await requireUser();

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    await emailClient.send({
      from: {
        email: "InvoicePro@riyang.co.in",
        name: "InvoicePro",
      },
      to: [{ email: invoiceData.clientEmail }],
      template_uuid: "e23ea763-e89d-4dda-aa4e-bf60911a306b",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 500 }
    );
  }
}
