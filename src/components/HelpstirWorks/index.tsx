import { memo } from "react";
import "./styles.scss";
export default memo(({ className = "" }: { className?: string }) => {
  return (
    <section className={`${className} helpstir-works`}>
      <span className="header">
        How Helpstir <b>Works?</b>
      </span>
      <div className="footprints">
        <div className="step">
          <span className="stepper">
            step <i className="no">1</i>
          </span>
          <span className="title">Sign Up & Create a Profile</span>
          <p className="body">
            Easy sign-up, instant impact. Few clicks, and you’re officially a
            HELPSTiR.
          </p>
        </div>

        <div className="step">
          <span className="stepper">
            step <i className="no">2</i>
          </span>
          <span className="title">Know Someone Who Needs Help?</span>
          <p className="body">
            Snap a pic, add details, and raise a help request. Boom — we’ll
            route it to the nearest partner NGO
          </p>
        </div>
        <div className="step">
          <span className="stepper">
            step <i className="no">3</i>
          </span>
          <span className="title">Help Available = Help Accessible</span>
          <p className="body">
            Local partner NGOs respond and deliver support. Right people. Right
            time. Real change.
          </p>
        </div>
        <div className="step">
          <span className="stepper">
            step <i className="no">4</i>
          </span>
          <span className="title">Track the Impact</span>
          <p className="body">
            We don't stop at "sent" — we track every help request to ensure it’s
            delivered. Transparent. Real. Game-changing.
          </p>
        </div>
      </div>
    </section>
  );
});
