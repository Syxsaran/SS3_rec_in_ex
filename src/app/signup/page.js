"use client";
//นำเข้า
import React, { useState } from "react";
import Link from "next/link";
import './styles.css'; 

export default function SignupPage() { // คอมโพนเนนต์ SignupPage
  const [formValue, setFormValue] = useState({ //ค่าเริ่มต้น form เป็นว่าง
    username: "",
    password: "",
    name: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false); //ค่าเริ่มต้น

  const handleChange = (event) => { // ฟังก์ชัน handleChange เปลี่ยนข้อมูลในฟอร์ม
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => { // ฟังก์ชัน handleSubmit
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", { // ส่งคำขอ POST ไป "/api/signup"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue), // แปลงเป็น JSON
      });

      if (response.ok) { // ตรวจสอบ
        console.log("User created successfully");
        setSignupSuccess(true); // สถานะสำเร็จ
      } else {
        const data = await response.json();
        if (data.error === "Username is already in use") {
          console.error("Username is already in use");
        } else {
          console.error("User creation failed");
        }
      }
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  }

  return (
    <>
      <h1 className="h1">This is Signup Page</h1>

      {signupSuccess ? ( // ตรวจสอบสถานะการลงทะเบียนเพื่อแสดงข้อความเมื่อการลงทะเบียนเสร็จสมบูรณ์
        <p className="p">Signup successful! You can now sign in.</p>
      ) : (
        <form onSubmit={handleSubmit}> {/* ฟอร์มลงทะเบียน */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
            <Link href="/signin">
              <button className="btn btn-primary">Sign In</button> 
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
