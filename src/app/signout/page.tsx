// C:\ปี\rec_in_ex\src\app\signout\page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignout = async () => {
      await signOut();
      router.push("/app");
    };

    handleSignout();
  }, []);

  return (
    <div>
      <p>Signing out...</p>
    </div>
  );
}
