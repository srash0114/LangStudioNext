"use client";
import Forgotpassword from "@/components/Auth/ForgotPasspages";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

export default function Forgotages() {
  const {userData, isLoadingAuth} = useUser();
  const router = useRouter();
  if (userData && isLoadingAuth) {
    router.push("/");
    return null;
  }
  return (
    <>
      <Breadcrumb pageName="Forgot Password" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Forgotpassword />
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
