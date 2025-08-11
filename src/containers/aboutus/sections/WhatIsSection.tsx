// WhatIsSection.tsx
import React from "react";
import TribeCard from "@/components/Cards/TribeCard";
import FeatureCard from "@/components/Cards/FeatureCard";
import "./WhatIsSection.scss";
import { useRouter } from "next/navigation";

const WhatIsSection = () => {
  const tribeQuestions = [
    {
      message: [
        { text: "Wanted to help but had ", highlight: false },
        { text: "no time or cash? ", highlight: true },
      ],
      icon: "images/icons/system-mech.svg",
    },
    {
      message: [
        { text: "Struggled to find the ", highlight: false },
        { text: "right people or resources ", highlight: true },
        { text: "to make it count?", highlight: false },
      ],
      icon: "images/icons/heart-hand.svg",
    },
    {
      message: [
        { text: "Stuck with ", highlight: false },
        { text: 'mindless "just donate" ', highlight: true },
        { text: "options online?", highlight: false },
      ],
      icon: "images/icons/brain-rot.svg",
    },
    {
      message: [
        { text: "Have empathy and have the ", highlight: false },
        { text: "guts to act ", highlight: true },
        { text: "upon it?", highlight: false },
      ],
      icon: "images/icons/idea-punch.svg",
    },
  ];
  const router = useRouter();
  const redirectToSignUp = () => {
    router.push("/signup");
  };
  const redirectToNGO = () => {
    router.push("/ngo-signup");
  };
  return (
    <div className="what-is-section">
      <div className="tinted-blue">
        <h1 className="title">
          What is <strong>HELPSTiR?</strong>
        </h1>

        <p className="platform-description">
          Helpstir is a platform dedicated to empowering communities by
          connecting them with local NGOs and volunteers. Using geo-location
          technology, it ensures swift identification of issues and efficient
          solutions.
        </p>

        <div className="platform-tag">
          World's First &nbsp;
          <span className="highlight">Geo Location-Based Philanthropy</span>
          &nbsp; Platform
        </div>

        <p className="motto">
          Helping isn't just about money —<br />
          <strong>IT'S ABOUT ACTION.</strong>
        </p>
      </div>

      <div className="separator" />
      <div className="tribe-section">
        <h2 className="title">
          <strong>Ever felt </strong>like?
        </h2>
        <TribeCard questions={tribeQuestions} />
      </div>

      <button className="cta-button dark" onClick={redirectToSignUp}>
        Be a HELPSTiR
      </button>

      <div className="features-container">
        <FeatureCard
          title="With HELPSTiR,"
          description="You can raise help requests for people in need and get them connected to local NGOs ready to support."
          highlight="No cash, just pure impact."
          icon="help-request"
          imagePosition="right"
        />

        <FeatureCard
          title="Need to Volunteer?"
          description="We've got you. Discover local opportunities and create change where it matters most —"
          highlight="right in your own community."
          icon="volunteer"
          imagePosition="left"
        />
      </div>

      <button className="cta-button dark" onClick={redirectToNGO}>
        Join HELPSTiR
      </button>
    </div>
  );
};

export default WhatIsSection;
