import { cn } from "@/lib/utils";
import { ImSpinner3 } from "react-icons/im";

type SpinnerProps = React.ComponentProps<typeof ImSpinner3>;

const Spinner = ({ className, size = 50, ...props }: SpinnerProps) => {
  return (
    <ImSpinner3
      className={cn("animate-spin text-sky-500 ", className)}
      size={size}
      {...props}
    />
  );
};
export default Spinner;
