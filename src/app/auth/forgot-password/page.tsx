import Forgotpassword from "@/components/Auth/Forgotpages";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function SignUp() {
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
