"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/submitButtons";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";


export default function Onboarding() {
    const [lastResult, action] = useActionState(onboardUser, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return (parseWithZod(formData, { schema: onboardingSchema }))
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        You are almost finished!
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                        className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="John"
                                />
                                <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    placeholder="Doe"
                                />
                                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                placeholder="Street 123"
                            />
                            <p className="text-red-500 text-sm">
                                {fields.address.errors}
                            </p>
                        </div>
                        <SubmitButton text="Finish onboarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}