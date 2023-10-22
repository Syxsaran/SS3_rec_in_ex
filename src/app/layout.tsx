"use client";
import Providers from "@/components/providers";
import SigninButton from "@/components/signinbutton";
import { Inter } from "next/font/google";
import './page.module.css';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={inter.className}>
        <Providers>
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <h1>
                <span className="text-gradient">Record income and expenses</span>
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
