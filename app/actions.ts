"use server";

import { requierUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requierUser();
  //input validation(server side validation)
  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function CreateInvoice() {
  const session = await requierUser();
}
