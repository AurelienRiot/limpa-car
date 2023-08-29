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
import { Markdown } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LaunchIcon from "@mui/icons-material/Launch";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GridCells from "./grid-cells";

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
  const emojiList: {
    emoji: string;
    label: string;
  }[] = [
    { emoji: "🔵", label: "cercle bleu" },
    { emoji: "🔴", label: "cercle rouge" },
    { emoji: "🟠", label: "cercle orange" },
    { emoji: "🟡", label: "cercle jaune" },
    { emoji: "🟢", label: "cercle vert" },
    { emoji: "🟣", label: "cercle violet" },
    { emoji: "⚫", label: "cercle noir" },
    { emoji: "⚪", label: "cercle blanc" },
    { emoji: "🟤", label: "cercle marron" },
    { emoji: "🔻", label: "triangle rouge vers le bas" },
    { emoji: "🔺", label: "triangle rouge vers le haut" },
    { emoji: "💠", label: "losange avec un point à l'intérieur" },
    { emoji: "🔷", label: "losange bleu grand" },
    { emoji: "🔶", label: "losange orange grand" },
    { emoji: "🔳", label: "carré blanc" },
    { emoji: "🔲", label: "carré noir" },
    { emoji: "🟥", label: "carré rouge" },
    { emoji: "🟧", label: "carré orange" },
    { emoji: "🟨", label: "carré jaune" },
    { emoji: "🟩", label: "carré vert" },
    { emoji: "🟦", label: "carré bleu" },
    { emoji: "🟪", label: "carré violet" },
    { emoji: "🟫", label: "carré marron" },
    { emoji: "🔥", label: "feu" },
    { emoji: "💧", label: "eau" },
    { emoji: "🌪️", label: "tornade" },
    { emoji: "🌈", label: "arc-en-ciel" },
    { emoji: "🌊", label: "vague" },
    { emoji: "🌞", label: "soleil" },
    { emoji: "🌝", label: "lune" },
    { emoji: "⭐", label: "étoile" },
    { emoji: "🌍", label: "terre" },
    { emoji: "🍁", label: "feuille d'érable" },
    { emoji: "🍂", label: "feuille morte" },
    { emoji: "🌿", label: "feuille verte" },
    { emoji: "🍃", label: "feuille dans le vent" },
  ];

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
                    <PopoverContent
                      align="start"
                      className="flex flex-row flex-wrap gap-2 w-44"
                    >
                      {emojiList.map((emoji) => (
                        <Tooltip key={emoji.label}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                insertEmoji(field, emoji.emoji);
                                setOpenEmoji(false);
                              }}
                            >
                              {emoji.emoji}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{emoji.label}</span>
                          </TooltipContent>
                        </Tooltip>
                      ))}
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
                        <AddPhotoAlternateIcon />
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
                        <LaunchIcon />
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
                        <HorizontalRuleIcon />
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
                        <FormatQuoteIcon />
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
                        <FormatListBulletedIcon />
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
                        <FormatListNumberedIcon />
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
