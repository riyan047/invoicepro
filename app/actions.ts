"use server";

import { requierUser } from "./utils/hooks";



export async function onboardUser() {
  const session = await requierUser();


}
