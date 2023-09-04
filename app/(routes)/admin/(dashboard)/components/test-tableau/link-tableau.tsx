import { TableCell, TableRow } from "@/components/ui/table";
import { Gauge } from "@/components/ui/gauge";
import { ForwardedRef, Fragment, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";

const LinksVisitors = forwardRef<HTMLElement, {}>((_, ref) => {
  const visitors = [
    {
      id: "1",
      name: "John Doe",
      totalDuration: 10,
      completionRate: 20,
    },
    {
      id: "2",
      name: "Jane Doe",
      totalDuration: 20,
      completionRate: 40,
    },
  ];

  return (
    <>
      <Slot ref={ref}>
        <>
          {visitors.map((visitor) => (
            <motion.tr
              key={visitor.id}
              layout
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                layout: { type: "tween" },
                animate: { duration: 1 },
              }}
              className="bg-gray-400 border-b transition-colors data-[state=selected]:bg-muted"
            >
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.totalDuration}</TableCell>
              <TableCell className="flex justify-start gap-2">
                {visitor.completionRate}{" "}
                <Gauge value={visitor.completionRate} showValue={true} />{" "}
              </TableCell>
            </motion.tr>
          ))}
        </>
      </Slot>
    </>
  );
});

LinksVisitors.displayName = "LinksVisitors";

export default LinksVisitors;
