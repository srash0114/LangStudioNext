// Header.tsx
"use client";

import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { useUser } from "@/app/UserContext";

export function Header() {
  const { toggleSidebar } = useSidebarContext();
  const { userData } = useUser();
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:mr-4"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>


      <div className="ml-2">
        <ThemeToggleSwitch userData={userData}/>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <UserInfo/>
      </div>
    </header>
  );
}
