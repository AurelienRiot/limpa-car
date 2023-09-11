import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { cn } from "../lib/utils";

export const Markdown: React.FC<{ children: string; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      className={cn("prose dark:prose-invert ", className)}
    >
      {children}
    </ReactMarkdown>
  );
};
