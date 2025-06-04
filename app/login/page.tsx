import { Button } from "@/components/ui/button";
import {
    Card,
    // CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                        <form className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input placeholder="Your email" />
                            </div>
                            <Button>Submit</Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </>
    );
}