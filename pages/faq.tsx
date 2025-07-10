import React from 'react';
import Accordion from '@/components/accordion';

const AboutPage: React.FC = () => {
  return (
    <>
      <h1 style={{ color: '#8e0000', textAlign: 'center', margin: '50px 0' }}>
        Most popular question
      </h1>

      <div>
        <Accordion
          question="How can I play with my friends?"
          answer="You need to create room and share unique room code or link with your friends."
        />
        <Accordion
          question="There are no any communicate system. How should I play?"
          answer="That is not in website conditions. You need to get together anyhow."
        />
        <Accordion
          question="How long room lives?"
          answer="Room and game session is provided for 2 hours."
        />
        <Accordion
          question="I can improve your project functionality. May I try?"
          answer="Contact with website admin to discuss this issue."
        />
        <Accordion
          question="Is it OpenSource project?"
          answer="Yes, it is. You can find GitHub repository link in website footer."
        />
      </div>
    </>
  );
};

export default AboutPage;
