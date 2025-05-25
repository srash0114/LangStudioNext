"use client";

import VideoHistoryForm from "@/components/listening-form/VideoHistoryForm"
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

export default function VideoHistory() {
    const { userData, isLoadingAuth } = useUser();
    const router = useRouter();

    if (!userData && !isLoadingAuth) {
      router.push("/auth/sign-in");
      return null;
    }
    return (
        <>
          <VideoHistoryForm/>
        </>
    );
}
