"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Gauge } from "@/components/ui/gauge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slot } from "@radix-ui/react-slot";
import { ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

const TestTableau = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
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
              <Fragment key={link.id}>
                <TableRow>
                  <TableCell>{link.name} </TableCell>
                  <TableCell>{link.id} </TableCell>
                  <TableCell
                    className="cursor-pointer bg-primary text-primary-foreground"
                    onClick={() =>
                      setIsOpen((prev) => (prev === link.id ? null : link.id))
                    }
                  >
                    {link.viewCount}
                  </TableCell>
                </TableRow>
                {isOpen === link.id && (
                  <Slot>
                    <>
                      {visitors.map((visitor) => (
                        <TableRow
                          key={visitor.id}
                          className="overflow-hidden transition duration-500 max-h-0"
                        >
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
                  </Slot>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <Collapsible>
        <CollapsibleTrigger>Ouvrir le menu</CollapsibleTrigger>
        <CollapsibleContent
          className="overflow-hidden data-[state=open]:animate-collapsible-down
          data-[state=closed]:animate-collapsible-up"
        >
          <p>text 1</p>
          <p>text 1</p>
          <p>text 1</p>
          <p>text 1</p>
        </CollapsibleContent>
      </Collapsible>
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
              {links
                ? links.map((link) => (
                    <Collapsible key={link.id} asChild>
                      <>
                        <TableRow>
                          <TableCell>{link.name}</TableCell>
                          <TableCell>{link.id}</TableCell>
                          <TableCell>
                            <CollapsibleTrigger asChild>
                              <div className="flex justify-end px-2 space-x-1 [&[data-state=open]>svg.chevron]:rotate-180 data-[state=open]:bg-gray-300 transition-colors duration-1000">
                                <ChevronDown className="w-4 h-4 transition-transform duration-500 shrink-0 chevron" />
                              </div>
                            </CollapsibleTrigger>
                          </TableCell>
                        </TableRow>
                        <CollapsibleContent
                          asChild
                          className="h-0 overflow-hidden transition-all duration-500 ease-in-out"
                        >
                          <>
                            {visitors.map((visitor) => (
                              <TableRow key={visitor.id}>
                                <TableCell> {visitor.name}</TableCell>
                                <TableCell>{visitor.totalDuration}</TableCell>
                                <TableCell>
                                  <Gauge
                                    value={visitor.completionRate}
                                    showValue={true}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TestTableau;
