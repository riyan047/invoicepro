"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
    text: string;
    variant?:
    "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined
}

const SubmitButton = ({ text, variant }: iAppProps) => {
    const { pending } = useFormStatus();
    return (
        <>
            {
                pending ? (<Button
                    disabled
                    className="w-full"
                    variant={variant}
                >
                    <Loader2 className=" size-4
                    animate-spin" />
                    Please wait...
                </Button>)
                    :
                    (<Button
                        type="submit"
                        className="w-full"
                        variant={variant}
                    >{text}</Button>)
            }
        </>
    )
}

export default SubmitButton;