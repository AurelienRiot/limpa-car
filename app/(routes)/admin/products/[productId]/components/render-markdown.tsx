"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./product-form";
import { TextArea } from "@/components/ui/text-area";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GridCells from "./grid-cells";
import { ImagePlus, Link, List, ListOrdered, Minus, Quote } from "lucide-react";

type RenderMarkdownProps = {
  form: UseFormReturn<ProductFormValues>;
  loading: boolean;
};

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ form, loading }) => {
  const productSpecswatch = form.watch("productSpecs");
  const [openTableau, setOpenTableau] = useState(false);
  const [openTitles, setOpenTitles] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [row, setRow] = useState<number | undefined>(3);
  const [column, setColumn] = useState<number | undefined>(3);

  const titres = ["h1", "h2", "h3", "h4"] as const;

  function createMarkdownTable(
    field: FieldValues,
    row: number | undefined,
    col: number | undefined
  ) {
    if (row === undefined || col === undefined || row < 1 || col < 1) {
      toast.error("Les lines et colonnes doivent être supérieurs à 0");
      return;
    }
    const textarea = document.getElementById(
      "productSpecsTextArea"
    ) as HTMLTextAreaElement;

    const startPos = textarea.selectionStart;

    let lineStart = startPos;
    while (lineStart > 0 && textarea.value.charAt(lineStart - 1) !== "\n") {
      lineStart--;
    }

    let table = "";

    // Create header row
    table += "|";
    for (let i = 0; i < col; i++) {
      table += " Header " + (i + 1) + " |";
    }
    table += "\n";

    // Create separator row
    table += "|";
    for (let i = 0; i < col; i++) {
      table += " :---: |";
    }
    table += "\n";

    // Create data rows
    for (let i = 0; i < row; i++) {
      table += "|";
      for (let j = 0; j < col; j++) {
        table += " Cell" + (i + 1) + (j + 1) + " |";
      }
      table += "\n";
    }

    const newValue =
      productSpecswatch.substring(0, lineStart) +
      table +
      productSpecswatch.substring(lineStart);

    field.onChange(newValue);
  }

  const insertEmoji = (field: FieldValues, emoji: string) => {
    const textarea = document.getElementById(
      "productSpecsTextArea"
    ) as HTMLTextAreaElement;

    const startPos = textarea.selectionStart;

    const newValue =
      productSpecswatch.substring(0, startPos) +
      emoji +
      productSpecswatch.substring(startPos);
    field.onChange(newValue);
  };

  const insertMarkdown = (
    field: FieldValues,
    variant:
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "bold"
      | "italic"
      | "barré"
      | "image"
      | "link"
      | "line"
      | "quote"
      | "unorderedList"
      | "orderedList"
  ) => {
    const textarea = document.getElementById(
      "productSpecsTextArea"
    ) as HTMLTextAreaElement;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    let lineStart = startPos;
    let endLine = startPos;
    while (lineStart > 0 && textarea.value.charAt(lineStart - 1) !== "\n") {
      lineStart--;
    }
    while (
      endLine < textarea.value.length &&
      textarea.value.charAt(endLine) !== "\n"
    ) {
      endLine++;
    }

    function addPrefixAndSuffixToString(prefix: string, suffix: string) {
      return (
        productSpecswatch.substring(0, startPos) +
        prefix +
        productSpecswatch.substring(startPos, endPos) +
        suffix +
        productSpecswatch.substring(endPos)
      );
    }

    function insertCharacterAtStartOfLine(character: string) {
      return (
        productSpecswatch.substring(0, lineStart) +
        character +
        productSpecswatch.substring(lineStart)
      );
    }
    function insertText(text: string) {
      return (
        productSpecswatch.substring(0, startPos) +
        text +
        productSpecswatch.substring(startPos)
      );
    }

    let prefix = "";
    let suffix = "";
    let newValue;

    switch (variant) {
      case "h1":
        prefix = "# ";
        newValue = insertCharacterAtStartOfLine(prefix);
        break;
      case "h2":
        prefix = "## ";
        newValue = insertCharacterAtStartOfLine(prefix);

        break;
      case "h3":
        prefix = "### ";
        newValue = insertCharacterAtStartOfLine(prefix);

        break;
      case "h4":
        prefix = "#### ";
        newValue = insertCharacterAtStartOfLine(prefix);

        break;

      case "bold":
        prefix = "**";
        suffix = "**";
        newValue = addPrefixAndSuffixToString(prefix, suffix);
        break;
      case "italic":
        prefix = "*";
        suffix = "*";
        newValue = addPrefixAndSuffixToString(prefix, suffix);
        break;
      case "barré":
        prefix = "~";
        suffix = "~";
        newValue = addPrefixAndSuffixToString(prefix, suffix);
        break;
      case "image":
        prefix = "![alt](image url) ";
        newValue = insertText(prefix);
        break;
      case "link":
        prefix = "[text](url) ";
        newValue = insertText(prefix);
        break;
      case "line":
        prefix = "---\n ";
        newValue = insertCharacterAtStartOfLine(prefix);
        break;
      case "quote":
        prefix = "> ";
        newValue = insertCharacterAtStartOfLine(prefix);
        break;
      case "unorderedList":
        prefix = "- ";
        newValue = insertCharacterAtStartOfLine(prefix);
        break;
      case "orderedList":
        prefix = "1. ";
        newValue = insertCharacterAtStartOfLine(prefix);
        break;
    }

    field.onChange(newValue);
  };

  return (
    <FormField
      control={form.control}
      name="productSpecs"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Spécification du produit</FormLabel>

          <div className="grid grid-cols-1 gap-2 lg:flex">
            <FormControl className="min-h-[20rem] lg:w-1/2">
              <div className="flex flex-col ">
                <div className="flex flex-row flex-wrap gap-2 ">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "italic");
                        }}
                        className="italic"
                      >
                        I
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Italic</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "bold");
                        }}
                        className="font-bold"
                      >
                        B
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gras</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "barré");
                        }}
                        className="line-through"
                      >
                        S
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Barré</p>
                    </TooltipContent>
                  </Tooltip>

                  <Popover onOpenChange={setOpenEmoji} open={openEmoji}>
                    <PopoverTrigger asChild>
                      <Button variant="markdown">😄</Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto">
                      <EmojiPicker
                        previewConfig={{ showPreview: false }}
                        searchPlaceholder="Rechercher"
                        width="350px"
                        onEmojiClick={(e) => {
                          insertEmoji(field, e.emoji);
                          setOpenEmoji(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "image");
                        }}
                      >
                        <ImagePlus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Image</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "link");
                        }}
                      >
                        <Link />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lien</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "line");
                        }}
                      >
                        <Minus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ligne</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "quote");
                        }}
                      >
                        <Quote />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Citation</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "unorderedList");
                        }}
                      >
                        <List />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Liste non ordonnée</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"markdown"}
                        onClick={(e) => {
                          e.preventDefault();
                          insertMarkdown(field, "orderedList");
                        }}
                      >
                        <ListOrdered />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Liste ordonnée</p>
                    </TooltipContent>
                  </Tooltip>

                  <Popover onOpenChange={setOpenTitles} open={openTitles}>
                    <PopoverTrigger asChild className="w-16">
                      <Button variant="markdown">Titre</Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-16">
                      {titres.map((titre, index) => (
                        <div
                          key={index}
                          className="pb-1 cursor-pointer"
                          onClick={() => {
                            insertMarkdown(field, titre);
                            setOpenTitles(false);
                          }}
                        >
                          {titre}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                  <Popover onOpenChange={setOpenTableau} open={openTableau}>
                    <PopoverTrigger asChild className="w-32">
                      <Button variant="markdown">Tableau</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex flex-col w-32"
                    >
                      <div className="flex flex-row items-center ">
                        <Input
                          type="number"
                          value={row}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value) {
                              setRow(Number(value));
                            } else {
                              setRow(undefined);
                            }
                          }}
                          className="px-1 text-center"
                        />
                        <p className="px-2">x</p>
                        <Input
                          type="number"
                          value={column}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value) {
                              setColumn(Number(value));
                            } else {
                              setColumn(undefined);
                            }
                          }}
                          className="px-1 text-center"
                        />
                      </div>
                      <Button
                        className="mt-4 mb-4"
                        onClick={(e) => {
                          e.preventDefault();
                          createMarkdownTable(field, row, column);
                          setOpenTableau(false);
                        }}
                      >
                        Créer
                      </Button>
                      <GridCells
                        handleCellClick={(rowIndex, colIndex) => {
                          createMarkdownTable(
                            field,
                            rowIndex + 1,
                            colIndex + 1
                          );
                          setOpenTableau(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <TextArea
                  onClick={() => {
                    setOpenTableau(false);
                  }}
                  id="productSpecsTextArea"
                  className="min-h-[20rem] sm:w-full h-auto sm:h-full mt-2 "
                  disabled={loading}
                  placeholder="Spécification"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    form.trigger();
                  }}
                />
              </div>
            </FormControl>

            <Markdown className="ml-2 lg:w-1/2">{productSpecswatch}</Markdown>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RenderMarkdown;
