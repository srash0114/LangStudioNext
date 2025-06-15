"use client";

import EssayChecker from "@/components/essay-form/EssayChecker";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";
import ActiveProReminderPopup from "@/components/ActiveProCPN/ActiveProCPN"

export default function SignUp() {
    const { userData, isLoadingAuth } = useUser();
    const router = useRouter();

    if (!userData && !isLoadingAuth) {
      router.push("/auth/sign-in");
      return null;
    }

    return (
      <>
        {!userData?.isPro && (
          <ActiveProReminderPopup message="Essay Checker"></ActiveProReminderPopup>
        )}
        <EssayChecker />
      </>
    );
}
