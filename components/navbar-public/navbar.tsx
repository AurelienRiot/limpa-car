"use client";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import NavbarAction from "./navbar-actions";
import MobileNav from "./mobile-nav";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@prisma/client";

type NavBarProps = {
  session: Session | null;
  categories: Category[];
};

const NavBar: React.FC<NavBarProps> = ({ session, categories }) => {
  const isSession = session ? true : false;
  const [isNavbar, setIsNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction === "down" && scrollY > 200) {
        setIsNavbar(false);
      } else {
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
      <AnimatePresence>
        {isNavbar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isNavbar ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-0 z-30 w-full bg-background border-b-2 border-border  `}
          >
            <Container>
              <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-4">
                <div className="flex ">
                  <Link
                    href="/"
                    className="items-center hidden ml-4 duration-200 ease-in sm:flex lg:ml-0 hover:scale-105"
                  >
                    <p className="text-lg font-bold sm:text-xl text-primary">
                      {" "}
                      Limpa Car
                    </p>
                  </Link>
                  <div className="hidden lg:flex lg:items-center">
                    <MainNav data={categories} isSession={isSession} />
                  </div>
                  <MobileNav
                    data={categories}
                    isSession={isSession}
                    className="ml-2 lg:hidden"
                  />
                </div>

                <NavbarAction session={session} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
