// Place "use client" at the top of the file
"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PersonalInfoForm } from "./components-profile/personal-info";
import { UploadPhotoForm } from "./components-profile/upload-photo";
import { UpdatePassword } from "./components-profile/password-info";
import { useState, useEffect, useCallback } from "react";
import { getUserInfo, User } from "@/fetch-data";



export default function SettingsPage() {
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUserInfo = useCallback(async () => {
    const data = await getUserInfo();
    setUserData(data);
  }, []);

  useEffect(() => {
    fetchUserInfo();

    const handleUserLogin = () => {
      fetchUserInfo();
    };

    window.addEventListener("update-header", handleUserLogin);

    return () => {
      window.removeEventListener("update-header", handleUserLogin);
    };
  }, [fetchUserInfo]);

  if (!userData) {
    return "Vui lòng đăng nhập";
  }

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      
      
      
      <Breadcrumb pageName="Profile" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <PersonalInfoForm userData={userData} />
          <div className="mt-6.5">
            <UpdatePassword />
          </div>
        </div>

        <div className="col-span-5 xl:col-span-2">
          <UploadPhotoForm userData={userData}/>
        </div>
      </div>
    </div>
  );
}
