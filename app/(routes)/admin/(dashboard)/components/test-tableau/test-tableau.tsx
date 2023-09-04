"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gauge } from "@/components/ui/gauge";

const TestTableau = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    {
      id: "1",
      name: "Link 1",
      viewCount: 10,
    },
    {
      id: "2",
      name: "Link 2",
      viewCount: 20,
    },
    {
      id: "3",
      name: "Link 3",
      viewCount: 30,
    },
  ];

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
    <div className="w-full sm:p-4">
      <h2 className="p-4">All links</h2>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <Collapsible asChild key={link.id}>
                <>
                  <TableRow>
                    <TableCell>{link.name} </TableCell>
                    <TableCell>{link.id} </TableCell>
                    <CollapsibleTrigger asChild>
                      <TableCell>{link.viewCount} </TableCell>
                    </CollapsibleTrigger>
                  </TableRow>
                  <CollapsibleContent
                    asChild
                    className={`overflow-hidden transition-all duration-300 ease-out data-[state=open]:text-5xl`}
                  >
                    <>
                      {visitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                          <TableCell>{visitor.name}</TableCell>
                          <TableCell>{visitor.totalDuration}</TableCell>
                          <TableCell className="flex justify-start gap-2">
                            <Gauge
                              value={visitor.completionRate}
                              showValue={true}
                            />{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </div>

      <Collapsible></Collapsible>
    </div>
  );
};

export default TestTableau;
