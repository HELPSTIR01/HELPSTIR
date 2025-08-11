import { TimelineStep } from "./TimelineStep";

// TimelineSteps.tsx
const TimelineSteps: React.FC = () => {
    const steps = [
      {
        number: 1,
        title: "Sign Up & Create a Profile",
        description: "Easy sign-up, instant impact. Few clicks, and you're officially a Timeline."
      },
      {
        number: 2,
        title: "Know Someone Who Needs Help?",
        description: "Snap a pic, add details, and raise a help request. Boom — we'll route it to the nearest partner NGO"
      },
      {
        number: 3,
        title: "Help Available = Help Accessible",
        description: "Local partner NGOs respond and deliver support. Right people. Right time. Real change."
      },
      {
        number: 4,
        title: "Track the Impact",
        description: "We don't stop at \"sent\" — we track every help request to ensure it's delivered. Transparent. Real. Game-changing."
      }
    ];
  
    return (
      <div className="timeline-container">
        <h1>How Timeline Works?</h1>
        {steps.map((step, index) => (
          <TimelineStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    );
  };
  
  export default TimelineSteps;