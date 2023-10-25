import React from "react"; // นำเข้า 
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode; // ประกาศพร็อพส์ children ที่รับค่าเป็น React Node
}

const Providers = ({ children }: Props) => { // ประกาศ Providers ที่รับ children
  return (
    <SessionProvider> {/* ใช้ SessionProvider เพื่อจัดการรับประกันความปลอดภัย*/}
      {children} {/* นำ children เข้าไปใน SessionProvider */}
    </SessionProvider>
  );
};

export default Providers; // ส่งคอมโพนเนนต์ Providers ออกเพื่อใช้ในแอปพลิเคชัน
