"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import './styles.css';

export default function Page() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValue.username,
          password: formValue.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const authResponse = await signIn("credentials", {
            username: formValue.username,
            password: formValue.password,
            redirect: false,
            callbackUrl: "/",
          });

          if (authResponse?.ok) {
            router.push("/main");
          } 
          else {
            console.error("Authentication failed");
          }
        } else {
          console.error("Authentication failed");
        }
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="h1">This is Signin Page</h1>
      <form className= "form" onSubmit={onSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>

            <div className="button-container">
              <button className="btn btn-primary" type="submit">
                Signin
              </button>
              <Link href="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>

      </form>
    </div>
  );
}
