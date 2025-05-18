// Header.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { getUserInfo, User } from "@/fetch-data";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await getUserInfo();
      setUserData(data);
    } catch {
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();

    const handleLogin = () => fetchUserInfo();
    const handleLogout = () => setUserData(null);

    window.addEventListener("update-header", handleLogin);
    window.addEventListener("user-logout-success", handleLogout);

    return () => {
      window.removeEventListener("update-header", handleLogin);
      window.removeEventListener("user-logout-success", handleLogout);
    };
  }, [fetchUserInfo]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="ml-2">
        <ThemeToggleSwitch userData={userData}/>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <Notification />
        <UserInfo userData={userData} />
      </div>
    </header>
  );
}
