
import { signOut } from "@/app/utils/auth";
import { requierUser } from "../utils/hooks";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    const session = await requierUser();
    return (
        <div className="flex">
            <form
                action={async (formData) => {
                    "use server"
                    await signOut()
                }}
                className="flex flex-col gap-y-4"
            >DASHBOARD
                <Button type="submit">Sign out</Button>
            </form>
        </div>
    )
}