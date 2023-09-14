import { cn } from "@/lib/utils";

const GlitchText = ({
  text,
  className,
  as: As = "p",
}: {
  as?: React.ElementType;
  text: string;
  className?: string;
}) => {
  return (
    <As
      className={cn(
        `animate-[glitch_1s_linear_infinite] 
      before:clip-path-polygon-[0_0,_100%_0,_100%_33%,_0_33%]
      before:animate-[glitch-top_1s_linear_infinite] before:content-['${text}'] before:absolute before:left-0
      after:animate-[glitch-bottom_1s_linear_infinite] after:content-['${text}'] after:absolute after:left-0
      after:clip-path-polygon-[0_67%,_100%_67%,_100%_100%,_0_100%]
      `,
        className
      )}
    >
      {text}
    </As>
  );
};

export default GlitchText;
