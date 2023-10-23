// SigninButton.tsx
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignin = () => {
    router.push("/signin");
  };

  const handleSignout = async () => {
    await signOut();
    router.push("/page"); // Redirect to the desired page after signing out
  };

  if (session && session.user) {
    return (
      <>
        <p>{session.user.name}</p>
        <button className="btn btn-danger" onClick={handleSignout}>
          SignOut
        </button>
      </>
    );
  }

  return (
    <>
      <button onClick={handleSignin} className="btn btn-primary">
        SignIn
      </button>
    </>
  );
};

export default SigninButton;
