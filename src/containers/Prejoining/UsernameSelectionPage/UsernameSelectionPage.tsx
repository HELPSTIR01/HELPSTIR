// components/UsernameSelectionPage/UsernameSelectionPage.tsx
"use client";
import React, { useState } from "react";
import { FormInput } from "@/components/FormInput/FormInput";
import { SubmitButton } from "@/components/Button/SubmitButton";
import "./UsernameSelectionPage.scss";
import Image from "next/image";
import Link from "next/link";

export const UsernameSelectionPage: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    console.log("Selected username:", username);
  };

  const handleSkip = () => {
    console.log("Skipped username selection");
  };

  return (
    <div className="username-page">
      <div className="header">
        <div className="brand">
          <img src="/images/logo.svg" alt="helpstir" />
        </div>
        <Link href="/signup/congratulation">
          <button onClick={handleSkip} className="skip-button">
            Skip
          </button>
        </Link>
      </div>

      <div className="content">
        <div className="creative-section">
          <span className="icon">🎨</span>
          <span className="text">Get Creative!!</span>
        </div>

        <h1 className="title">Book your unique Helpstir id!</h1>

        <div className="input-section">
          <FormInput
            label=""
            value={username}
            onChange={setUsername}
            placeholder="Enter your unique username"
            prefix="i."
          />
        </div>
        <Image
          src="/images/zigzagline.svg"
          alt="zigzag"
          width={400}
          height={100}
        />
        <div className="submit-section">
          <Link href="/signup/congratulation">
            <SubmitButton text="Confirm" onClick={handleSubmit} />
          </Link>
        </div>
      </div>
    </div>
  );
};
