import Link from "next/link";
import ForgotPassword from "../ForgotPassword";

export default function Signin() {
  return (
    <>

      <div>
        <ForgotPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
