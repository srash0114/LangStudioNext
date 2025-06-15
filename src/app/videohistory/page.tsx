"use client";

import VideoHistoryForm from "@/components/listening-form/VideoHistoryForm"
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";
import ActiveProReminderPopup from "@/components/ActiveProCPN/ActiveProCPN"

export default function VideoHistory() {
    const { userData, isLoadingAuth } = useUser();
    const router = useRouter();

    if (!userData && !isLoadingAuth) {
      router.push("/auth/sign-in");
      return null;
    }
    return (
        <>
          {!userData?.isPro && (
            <ActiveProReminderPopup message="Video History"></ActiveProReminderPopup>
          )}
          <VideoHistoryForm/>
        </>
    );
}
