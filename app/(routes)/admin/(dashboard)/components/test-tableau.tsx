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
import LinksVisitors from "./link-tableau";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
              <Collapsible key={link.id} asChild>
                <>
                  <TableRow>
                    <TableCell>{link.name} </TableCell>
                    <TableCell>{link.id} </TableCell>
                    <CollapsibleTrigger asChild>
                      <TableCell>{link.viewCount} </TableCell>
                    </CollapsibleTrigger>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <LinksVisitors />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TestTableau;
