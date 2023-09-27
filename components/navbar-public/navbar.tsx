"use client";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import NavbarAction from "./navbar-actions";
import MobileNav from "./mobile-nav";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { useCategories } from "@/hooks/use-categories";

type NavBarProps = {
  role: string | undefined;
};

const NavBar: React.FC<NavBarProps> = ({ role }) => {
  const [isNavbar, setIsNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollThreshold = 30;
    let navbarHeight = 64;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction === "down" &&
        scrollY > navbarHeight &&
        scrollY - lastScrollY > scrollThreshold
      ) {
        setIsNavbar(false);
      } else if (direction === "up" || scrollY <= navbarHeight) {
        setIsNavbar(true);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  return (
    <>
      <header
        data-state={isNavbar ? "on" : "off"}
        className={`fixed top-0 z-30 h-auto w-full border-b-2  border-border bg-background transition-transform data-[state=off]:scale-0 data-[state=on]:scale-100 `}
      >
        <Container>
          <div className="relative flex h-16  items-center justify-between px-4 sm:px-6 lg:px-4">
            <div className="flex ">
              <MobileNav className="ml-2 " />
              <Link
                href="/"
                className="ml-4 hidden items-center duration-200 ease-in hover:scale-105 sm:flex lg:ml-0"
              >
                <p className="text-lg font-bold text-primary sm:text-xl">
                  {" "}
                  Limpa Car
                </p>
              </Link>
              <nav className="mx-6 hidden items-center space-x-4  lg:flex lg:items-center lg:space-x-6">
                <MainNav />
              </nav>
            </div>

            <NavbarAction role={role} />
          </div>
        </Container>
      </header>
    </>
  );
};

export default NavBar;
