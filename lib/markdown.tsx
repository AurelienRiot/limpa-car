import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { cn } from "./utils";

export const Markdown: React.FC<{ children: string; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <ReactMarkdown remarkPlugins={[gfm]} className={cn("markdown", className)}>
      {children}
    </ReactMarkdown>
  );
};
