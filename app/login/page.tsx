import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/app/utils/auth";
import { useState } from "react";

export default function Login() {

    return (
        <>
            <div className="flex h-screen w-full justify-center items-center px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center font-semibold">Login</CardTitle>
                        <CardDescription>Enter your email below to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            action={async (formData) => {
                                "use server"
                                await signIn("nodemailer", formData)
                            }}
                            className="flex flex-col gap-y-4"
                        >
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="hello@hello.com"
                                />
                            </div>
                            <Button>Submit</Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </>
    );
}