import { memo } from "react";
import "./PartnerSection.scss";
import { useRouter } from "next/navigation";
export default memo(() => {
  const router = useRouter();
  return (
    <div className="partner-section right-section">
      <div className="hook-badge">NGO callouts</div>

      <div className="header-button-container">
        <h2>
          We only partner with <br />
          <b>awesome changemakers</b>
        </h2>
      </div>

      <div className="changemaker-container">
        <div className="ngo-banner">
          <div className="main-text">
            <b>Are you a changemaker</b> who is leading in your community?  
          </div>

          <button
            className="cta-button"
            onClick={() => {
              router.push("/ngo-signup");
            }}
          >
            Partner With Us
          </button>
          <div className="supportive-text">
            Partnership is Partnership, <b>No hidden charges </b>whatsoever we
            promise!
          </div>
        </div>
        {/* Add your image here */}
        <img src="/images/hand.svg" alt="Changemaker" />
      </div>
    </div>
  );
});
