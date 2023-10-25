"use client";
//นำเข้า
import Providers from "@/components/providers";
import SigninButton from "@/components/signinbutton";
import { Inter } from "next/font/google";
import './page.module.css'; 
const inter = Inter({ subsets: ["latin"] }); // สร้าง Inter โดยกำหนด subset ให้เป็น "latin"

export default function RootLayout({ children }: { children: React.ReactNode }) { // คอมโพนเนนต์ RootLayout ที่รับ children 
  return (
    <html lang="en"> 
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className} > 
        <Providers> 
          <nav className="navbar bg-body-tertiary"> 
            <div className="container-fluid"> 
              <h1>
                <span className="text-gradient">บันทึกรายรับรายจ่าย</span> 
              </h1>
              <div className="d-flex"> 
                <SigninButton /> 
              </div>
            </div>
          </nav>
          <div className="container">{children}</div> 
        </Providers>
      </body>
    </html>
  );
}
