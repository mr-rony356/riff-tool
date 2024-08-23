import React, { useState } from "react";

interface InfoSectionProps {
  title: string;
  content: string | JSX.Element;
  listItems?: string[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  content,
  listItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6">
      <div
        onClick={toggleSection}
        className="cursor-pointer flex items-center space-x-2"
      >
        <span className={`transform transition-transform text-2xl`}>
          {isOpen ? "▼" : "▶"}
        </span>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      {isOpen && (
        <div className="mt-2 ml-6">
          <p className="mb-4 text-xl">{content}</p>
          {listItems && (
            <ul className="list-disc pl-4 space-y-2">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const InfoSections = () => {
  return (
    <div className="mt-12  mx-auto text-black">
      <InfoSection
        title="How to use this tool"
        content={
          <div>
            <p>
              1. <strong>Copy & paste</strong> YouTube video link into The Riff
              Tool search bar above
            </p>
            <p>
              2. <strong>Set speed & loop</strong> parameters (start/end points)
            </p>
            <p>
              3. <strong>Hit Play</strong> and have fun learning!
            </p>
          </div>
        }
      />

      <InfoSection
        title="What is The Riff Tool?"
        content={
          <p>
            The Riff Tool was made so guitar players, and musicians who want to
            figure out difficult riffs can slow-down and loop specific parts of
            the song, without compromising the pitch. Giving you time to hear
            each note.
          </p>
        }
      />

      <InfoSection
        title="3 Stellar Reasons why you should sign up for premium now"
        content={
          <div>
            <p>
              1. Save your loops so you can pick up from where you left off.
              Sometimes I get interrupted and need to come back to the loop so
              this helps.
            </p>
            <p>
              <em>
                *Keep in mind. Songs that you save on your desktop/laptop
                computer won’t transfer when you log-in on your phone and vice
                versa.*
              </em>
            </p>
            <p>
              2. Simply bump up or back up the loop section by one second with a
              click of a button to seamlessly move throughout a song.
            </p>
            <p>
              3. Have fun figuring out more riffs while at the same time
              improving your playing!
            </p>
            <p>
              Click{" "}
              <a href="#" className="text-blue-500 underline">
                here
              </a>{" "}
              to become a premium member :)
            </p>
          </div>
        }
      />

      <InfoSection
        title="About founder"
        content={
          <p>
            Hey, I’m Chris. I hope you’ll love this tool as much as I do. See, I
            love learning new songs on the guitar. But sometimes that can be
            challenging when the riffs are going faster than my brain’s ability
            to catch up to my ears...
          </p>
        }
      />
    </div>
  );
};

export default InfoSections;
