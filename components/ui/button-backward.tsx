'use client';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonBackward = forwardRef<HTMLButtonElement, ButtonProps> (({
    className,
    disabled,
    type = "button",
    ...props
}, ref) => {
  const router = useRouter()
    return (
        <button className={cn("w-auto rounded-full bg-black border-transparent px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition ", className )} onClick={() => router.back()} disabled={disabled} ref={ref} {...props}>
         <HiArrowNarrowLeft className="w-6 h-6" />
        </button>
    );
});

ButtonBackward.displayName= "Button";

export default ButtonBackward;