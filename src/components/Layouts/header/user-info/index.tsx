// user-info.tsx
import { User } from "@/fetch-data";
import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogOutIcon, StarIcon, UserIcon } from "./icons";
import { useRouter } from "next/navigation";
import { logout } from "@/fetch-data";
import { GuestDropdown } from "./no-user";
import { useUser } from "@/app/UserContext";
import axios from 'axios';
import {handleSubmit} from "@/fetch-data";

export function UserInfo() {
  const { userData, isLoadingAuth } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      window.dispatchEvent(new Event("user-logout-success"));
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed!");
    }
  };
  if(isLoadingAuth){
      return null;
  }
  else{
    if (!userData) {
      return <GuestDropdown />;
    }
  }

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>
        <figure className="flex items-center gap-3 rounded-full border-2 bg-gray-2 dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-primary">
          <div className="relative">
            <Image
              src={userData.avatarUrl}
              className="size-12 rounded-full object-cover"
              alt={`Avatar for ${userData.fullName}`}
              role="presentation"
              width={200}
              height={200}
            />
            {userData.isPro && (
              <span className="absolute bottom-0 right-0 inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white border-2 border-gray-2 dark:border-dark-3">
                Pro
              </span>
            )}
          </div>
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{userData.fullName}</span>
            <ChevronUpIcon
              aria-hidden
              className={cn("rotate-180 transition-transform", isOpen && "rotate-0")}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>
        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <div className="relative">
            <Image
              src={userData.avatarUrl}
              className="size-12 rounded-full object-cover"
              alt={`Avatar for ${userData.fullName}`}
              role="presentation"
              width={200}
              height={200}
            />
            {userData.isPro && (
              <span className="absolute bottom-0 right-0 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-1.5 py-0.5 text-[10px] font-semibold text-white border-2 border-gray-2 dark:border-dark-3">
                Pro
              </span>
            )}
          </div>
          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {userData.fullName}
            </div>
            <div className="leading-none text-gray-6">{userData.email}</div>
          </figcaption>
        </figure>
        <hr className="border-[#E8E8E8] dark:border-dark-3" />
        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="mr-auto text-base font-medium">View profile</span>
          </Link>
          {!userData.isPro && (
          <div
            onClick={() => handleSubmit()}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white "
          >
            <StarIcon />
              <span className="mr-auto text-base font-medium">Active Pro</span>
          </div>
          )}
        </div>
        <hr className="border-[#E8E8E8] dark:border-dark-3" />
        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            <LogOutIcon />
            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
