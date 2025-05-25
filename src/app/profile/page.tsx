"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PersonalInfoForm } from "./components-profile/personal-info";
import { UploadPhotoForm } from "./components-profile/upload-photo";
import { UpdatePassword } from "./components-profile/password-info";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

export default function SettingsPage() {
  const { userData, isLoadingAuth } = useUser();
  const router = useRouter();
  
  if (!userData && !isLoadingAuth) {
    router.push("/auth/sign-in");
    return null;
  }

  return (
    <div className="mx-auto w-full h-screen">
      {/* <Breadcrumb pageName="Profile" /> */}

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <PersonalInfoForm userData={userData} />
          <div className="mt-6.5">
            <UpdatePassword />
          </div>
        </div>

        <div className="col-span-5 xl:col-span-2 mb-6.5">
          <UploadPhotoForm userData={userData}/>
        </div>
      </div>
    </div>
  );
}
