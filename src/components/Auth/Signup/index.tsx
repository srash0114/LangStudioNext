import Link from "next/link";
import SignupPassword from "../SignupPassword";

export default function Signin() {
  return (
    <>
      <div className="">
        <div>
          <SignupPassword />
        </div>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
