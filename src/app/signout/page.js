"use client";
//นำเข้า
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignoutPage() { // คอมโพนเนนต์ SignoutPage
  const router = useRouter(); // สร้าง router โดยใช้ useRouter สำหรับการนำทาง

  useEffect(() => { // ใช้ useEffect เพื่อรันโค้ด
    const handleSignout = async () => {
      await signOut(); // ฟังก์ชัน
      router.push("/app"); 
    };

    handleSignout(); // เรียก handleSignout 
  }, []); 

  return (
    <div>
      <p>Signing out...</p> 
    </div>
  );
}
