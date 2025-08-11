// FeatureSection.tsx
import React from "react";
import "./FeatureSection.scss";
import Image from "next/image";

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  iconAlt?: string;
}

interface FeatureSectionProps {
  sectionTitle: string;
  sectionTitleHighlight?: string;
  features: FeatureItem[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  sectionTitle,
  sectionTitleHighlight,
  features,
}) => {
  // Split the section title to highlight part of it if needed
  const renderSectionTitle = () => {
    if (sectionTitleHighlight) {
      const parts = sectionTitle.split(sectionTitleHighlight);
      return (
        <h2 className="feature-section__title">
          {parts[0]}
          <strong className="feature-section__title-highlight">
            {sectionTitleHighlight}
          {parts[1]}
          </strong>
        </h2>
      );
    }
    return <h2 className="feature-section__title">{sectionTitle}</h2>;
  };

  return (
    <section className="feature-section">
      <div className="feature-section__header">{renderSectionTitle()}</div>

      <div className="feature-section__content">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            {/* Header row with image and title */}
            <div
              className={`feature-item__header ${
                index % 2 === 0
                  ? "feature-item__header--odd"
                  : "feature-item__header--even"
              }`}
            >
              <div className="feature-item__icon-container">
                <Image
                  width={100}
                  height={100}
                  src={feature.icon}
                  alt={feature.iconAlt || `${feature.title} icon`}
                  className="feature-item__icon"
                />
              </div>
              <h3 className="feature-item__title">{feature.title}</h3>
            </div>

            {/* Description below */}
            <div className="feature-item__description-container">
              <p className="feature-item__description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
