// src/components/ContentSection/ContentSection.tsx
"use client";
import React from "react";
import "./ContentSection.scss";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import { useRouter } from "next/navigation";

const ContentSection: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const router = useRouter();

  const redirectToNGO = () => {
    router.push("/signup");
  };
  return (
    <section className={`${className} content-section`}>
      <CountdownTimer />
      <div className="content-section__text">
        <h1>
          The world's not short on resources — <br />
          just access.
        </h1>
        <p>
          There's plenty of food, shelter, and education, but it's not reaching
          the right people at the right time.
        </p>
        <span>We're here to change that with tech!</span>
        <button className="cta-button " onClick={redirectToNGO}>
          Be a HELPSTiR
        </button>
      </div>
    </section>
  );
};

export default ContentSection;
