// TribeCard.tsx
import Image from "next/image";
import React from "react";

interface TribeCardProps {
  questions: {
    message: {
      text: string;
      highlight: boolean;
    }[];
    icon: string;
  }[];
}

const TribeCard = ({ questions }: TribeCardProps) => {
  return (
    <div className="tribe-card">
      {questions.map((question, index) => (
        <div key={index} className="question-box">
          <div>
            {" "}
            {question.message.map((i) => (
              <span key={i.text} className={i.highlight ? "highlight" : ""}>
                {i.text}
              </span>
            ))}
          </div>

          <Image
            src={question.icon}
            alt={question.message.map((i) => i.text).join("")}
            width={20}
            height={20}
            className="bottom-fix"
          />
        </div>
      ))}
      <p className="tribe-message">
        If It's A <strong className="highlight">"YES"</strong> To Any Of These,
        You're One Of Us.
        <br />
        <strong>YOU'RE OUR TRIBE</strong>
        <span className="hearts">
          <Image
            width={100}
            height={100}
            src="/images/icons/HeartTransparent2.svg"
            alt="heart1"
            className="heart heart-1"
          />
          <Image
            width={100}
            height={100}
            src="/images/icons/HeartTransparent1.svg"
            alt="heart2"
            className="heart heart-2"
          />
        </span>
      </p>
    </div>
  );
};

export default TribeCard;
