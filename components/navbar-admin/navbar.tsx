import { MainNav } from "@/components/navbar-admin/main-nav";
import { ThemeToggle } from "@/components/navbar-admin/theme.toggle";
import MobileNav from "./mobile-nav";
import { LogoutButton } from "../auth/auth";

const Navbar = async () => {
  return (
    <div className="border-b ">
      <div className="flex items-center h-16 px-4">
        <MainNav className="hidden pl-2 lg:pl-8 md:block" />
        <MobileNav className="mx-6 md:hidden" />
        <div className="flex items-center ml-auto space-x-4">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
