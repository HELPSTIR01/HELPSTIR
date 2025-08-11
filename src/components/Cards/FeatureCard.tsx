import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  highlight: string;
  icon: string;
  imagePosition?: "left" | "right";
}

const FeatureCard = ({
  title,
  description,
  highlight,
  icon,
  imagePosition = "right"
}: FeatureCardProps) => {
  return (
    <div className={`feature-card ${imagePosition === "left" ? "left-image" : "right-image"}`}>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>
          {description}{" "}
          <span className="highlight">{highlight}</span>
        </p>
      </div>
      <div className={`feature-icon ${icon}`} />
    </div>
  );
};

export default FeatureCard;