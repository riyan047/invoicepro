import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/submitButtons";

export default function Onboarding() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
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
                        action={async () => {
                            "use server"

                        }}
                        className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input placeholder="John" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Doe" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input placeholder="Street 123" />
                        </div>
                        <SubmitButton text="Finish onboarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}