import React from 'react';
import './Timeline.scss';

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export const  TimelineStep: React.FC<StepProps> = ({ number, title, description, isLast = false }) => {
  return (
    <div className="timeline-step">
      <div className="step-number">step{number}</div>
      <div className="step-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {!isLast && <div className="dotted-line" />}
    </div>
  );
};