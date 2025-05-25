"use client";
import Signup from "@/components/Auth/Signup";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";


export default function SignUp() {
  const { userData } = useUser();
  const router = useRouter();
  if (userData) {
    router.push("/");
    return null;
  }
  return (
    <>
      <Breadcrumb pageName="Sign Up" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
