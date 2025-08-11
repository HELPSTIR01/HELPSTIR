// Example usage
import React from "react";
import FeatureSection from "./FeatureSection";
import geoLocationIcon from "../../../../public/images/icons/FeaturesSection/geo-location-icon.svg";
import hyperLocalIcon from "../../../../public/images/icons/FeaturesSection/hyper-local-icon.svg";
import volunteeringIcon from "../../../../public/images/icons/FeaturesSection/volunteering-icon.svg";
import ngoVerificationIcon from "../../../../public/images/icons/FeaturesSection/ngo-verification-icon.svg";

const FeatureSectionList: React.FC = () => {
  const featuresData = [
    {
      title: "Geo-Location Enabled Tech",
      description:
        "Forget far-off stories — help your neighborhood. Our geo-tech connects local communities with local resources for timely impact.",
      icon: geoLocationIcon,
    },
    {
      title: "Hyper-Local = Global Impact",
      description:
        "Change starts local, but it doesn’t end there. We’re creating hyper-local solutions that ripple into global impact.",
      icon: hyperLocalIcon,
    },
    {
      title: "Un-Tap Volunteering",
      description:
        "India’s heart beats with volunteerism. We’re here to make it easy, local, and accessible. Match your skills with NGO needs in your area.",
      icon: volunteeringIcon,
    },
    {
      title: "HELPSTiR Verified NGOs",
      description:
        "Not every NGO makes the cut. Ours do. Our 10-step verification process ensures you’re helping with confidence.",
      icon: ngoVerificationIcon,
    },
  ];

  return (
    <div className="app">
      <FeatureSection
        sectionTitle="What Makes Us Different?"
        sectionTitleHighlight="Us"
        features={featuresData}
      />
    </div>
  );
};

export default FeatureSectionList;
