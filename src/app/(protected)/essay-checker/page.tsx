import EssayChecker from "@/components/essay-form/EssayChecker";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essay Checker",
};

export default function SignUp() {
  return (
    <>

      <EssayChecker />

    </>
  );
}
