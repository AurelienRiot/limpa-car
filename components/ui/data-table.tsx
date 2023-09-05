"use client";

import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectValue, setSelectValue] = useState(searchKey);
  const [data, setData] = useState(initialData);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const flatHeaders = table.getFlatHeaders();
  const searchKeys = flatHeaders
    .filter((header) => header.id !== "actions" && header.id !== "createdAt")
    .map((header) => header.id);

  const removeKeys = ["aucune", ...searchKeys];

  const displayKeys = flatHeaders.map(
    (header) => header.column.columnDef.header
  );

  const displayRemovesKeys = ["aucune", ...displayKeys];

  function removeDuplicates(array: any[], key: string) {
    const seen: { [key: string]: boolean } = {};
    const result = [];
    if (key === "aucune") {
      return array;
    }
    for (const obj of array) {
      if (!(obj[key] in seen)) {
        seen[obj[key]] = true;
        result.push(obj);
      }
    }
    return result;
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 py-4 justify-content-center md:grid-cols-5">
        <Input
          placeholder="Recherche"
          value={
            (table.getColumn(selectValue)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(selectValue)?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <div className="relative inline-flex sm:pl-2 ">
          <Select
            defaultValue={selectValue}
            onValueChange={(newValue) => {
              table.getColumn(selectValue)?.setFilterValue("");
              setSelectValue(newValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              {searchKeys.map((key, index) => (
                <SelectItem key={key} value={key}>
                  {String(displayKeys[index])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            defaultValue={String(table.getState().pagination.pageSize)}
            onValueChange={(newPageSize) => {
              table.setPageSize(Number(newPageSize));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a page size" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize} lignes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:pl-2">
          <Select
            onValueChange={(selectedKey) => {
              setData(removeDuplicates(initialData, selectedKey));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Supprimé récurence" />
            </SelectTrigger>
            <SelectContent>
              {removeKeys.map((key, index) => (
                <SelectItem key={key} value={key}>
                  {String(displayRemovesKeys[index])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" bg-primary text-primary-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={"odd:bg-secondary even:bg-primary/50 "}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  Pas de résultats
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors border rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9"
        >
          Précedent
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="inline-flex items-center justify-center px-3 text-sm font-medium transition-colors border rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
