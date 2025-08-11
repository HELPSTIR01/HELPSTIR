import { memo } from "react";
import { useRouter } from "next/navigation";

export default memo(() => {
  const router = useRouter();
  return (
    <div className="right-section">
      <div className="header-button-container">
        <h2>
          Partner With Us, Create <strong>Better Impact</strong>
        </h2>
      </div>

      <div className="changemaker-container">
        <div className="ngo-banner">
          <div className="hook-badge">NGO callouts</div>

          <div className="main-text">Are you a changemaker </div>
          <div className="supportive-text">
            who is leading in your community?
          </div>
        </div>
        {/* Add your image here */}
        <img src="/images/hand.svg" alt="Changemaker" />
      </div>
      <button
        className="cta-button"
        onClick={() => {
          router.push("/ngo-signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
});
