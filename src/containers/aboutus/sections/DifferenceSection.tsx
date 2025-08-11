// DifferenceSection.tsx
import React from "react";
import "./DifferenceSection.scss";
import Image from "next/image";
import helpingHandImage from "../../../../public/images/difference1.png";
import childrenGroupImage from "../../../../public/images/difference2.png";
import { useRouter } from "next/navigation";

const DifferenceSection: React.FC = () => {
  const router = useRouter();
  const redirectToSignUp = () => {
    console.log("h");
    router.push("/signup");
  };
  return (
    <div className="helpstir-container">
      <div className="separator" />
      <div className="title-box">
        How Can you <strong>Make</strong>
        <br />
        <strong>a Difference?</strong>
      </div>

      <div className="content-area">
        <div className="text-image-layout">
          <div className="text-column">
            <p className="main-description">
              At Helpstir, you can make an impact{" "}
              <span>
                by volunteering your time, donating to local causes, or raising
                help requests for those in need.
              </span>{" "}
              Your actions connect people to resources and create lasting change
              in communities.
            </p>
          </div>

          <div className="images-column">
            <div className="images-area">
              <div className="image-container first-image">
                <Image
                  src={helpingHandImage}
                  alt="Person helping elderly man"
                />
              </div>

              <div className="image-container second-image">
                <Image src={childrenGroupImage} alt="Smiling children" />
              </div>
            </div>
          </div>
        </div>
        <p className="join-text">
          Join Helpstir today and start creating change in your community.
        </p>

        <button className="cta-button dark" onClick={redirectToSignUp}>
          Join HELPSTIR
        </button>

        <p className="tribe-text">
          <span className="blue-text">Join the Movement.</span> Your Tribe
          Awaits
        </p>
      </div>
    </div>
  );
};
export default DifferenceSection;
