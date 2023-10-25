"use client";
//นำเข้า
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SigninButton = () => { // คอมโพนเนนต์ SigninButton
  const { data: session } = useSession(); // ใช้ useSession เพื่อเข้าถึงข้อมูลเซสชันปัจจุบัน
  const router = useRouter(); // ใช้ useRouter เพื่อนำทางแอปพลิเคชัน

  const handleSignin = () => {
    router.push("/signin");
  };

  const handleSignout = async () => {
    await signOut(); // เรียกใช้ฟังก์ชัน
    router.push("/signout");
  };

  if (session && session.user) {
    return (
      <>
        <p style={{ margin: '10px', fontSize: '20px' }}>{session.user.name}</p>

        <button className="btn btn-danger" onClick={handleSignout} style={{ margin: '10px' }}>
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

export default SigninButton; // ส่งคอมโพนเนนต์ SigninButton
