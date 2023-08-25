import { cn } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";

type SpinnerProps = React.ComponentProps<typeof ImSpinner9>;

const Spinner = ({ className, size = 50, ...props }: SpinnerProps) => {
  return (
    <ImSpinner9
      className={cn("animate-spin text-sky-500 ", className)}
      size={size}
      {...props}
    />
  );
};
export default Spinner;
