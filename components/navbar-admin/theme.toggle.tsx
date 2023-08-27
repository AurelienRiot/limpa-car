"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <>
      {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
        <Button onClick={() => setTheme("light")} size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] " />
        </Button>
      ) : (
        <Button onClick={() => setTheme("dark")} size="icon">
          <Moon className="absolute h-[1.2rem] w-[1.2rem]  " />
        </Button>
      )}
      <span className="w-0 sr-only">Toggle theme</span>
    </>
  );
}
