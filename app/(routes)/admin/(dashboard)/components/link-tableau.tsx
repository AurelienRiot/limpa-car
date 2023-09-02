import { TableCell, TableRow } from "@/components/ui/table";
import { Gauge } from "@/components/ui/gauge";
import { ForwardedRef, Fragment, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

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
            <TableRow key={visitor.id}>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.totalDuration}</TableCell>
              <TableCell>{visitor.completionRate}</TableCell>
            </TableRow>
          ))}
        </>
      </Slot>
    </>
  );
});

LinksVisitors.displayName = "LinksVisitors";

export default LinksVisitors;
