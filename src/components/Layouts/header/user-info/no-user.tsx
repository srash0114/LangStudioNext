"use client";

import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";
import { ChevronUpIcon } from "@/assets/icons";
import { Authentication, IconSignUp } from "./icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import parkShinHye from '@/assets/user/park_shin_hye.jpg';

export function GuestDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3 rounded-full border-2 bg-gray-2 dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-primary">
          <Image

            src={parkShinHye}

            className="size-12 rounded-full object-cover"
            alt="Avatar"
            role="img"
            width={200}
            height={200}
          />
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>Authentication</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => {router.push('/auth/sign-in'); setIsOpen(false);}}
          >
            <Authentication />
            <span className="text-base font-medium">Log in</span>
          </button>
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => {router.push('/auth/sign-up'); setIsOpen(false);}}
          >
            <IconSignUp />
            <span className="text-base font-medium">Sign up</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
