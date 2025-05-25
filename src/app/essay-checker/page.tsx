"use client";

import EssayChecker from "@/components/essay-form/EssayChecker";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";

export default function SignUp() {
    const { userData, isLoadingAuth } = useUser();
    const router = useRouter();

    if (!userData && !isLoadingAuth) {
      router.push("/auth/sign-in");
      return null;
    }
    return (
      <>
        <EssayChecker />
      </>
    );
}
