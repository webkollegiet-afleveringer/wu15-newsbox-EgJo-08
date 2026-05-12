import { useState } from "react";
import one from "/images/onboarding_one.png";
import two from "/images/onboarding_two.png";
import three from "/images/onboarding_three.png";
import { Link, useNavigate } from "react-router-dom";
import Intro from "../../components/intro";

const onboardingArray = [
  {
    img: one,
    header: "Stay Connected, Everywhere, Anytime",
    text: "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content."
  },
  {
    img: two,
    header: "Become a Savvy Global Citizen.",
    text: "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!"
  },
  {
    img: three,
    header: "Enhance your News Journey Now!",
    text: "Be part of our dynamic community and contribute your insights and participate in enriching conversations."
  }
];

export function Onboarding() {
  const [index, setIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const navigate = useNavigate();

  const handleContinue = () => {
    if (index < onboardingArray.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/account");
    }
  };

  const current = onboardingArray[index];

  return (
    <>
      {showIntro && (
        <Intro onFinish={() => setShowIntro(false)} />
      )}

      {!showIntro && (
        <article className="Onboarding">
          <img src={current.img} alt="onboarding" />

          <h3>{current.header}</h3>

          <p>{current.text}</p>

          <div className="onboarding_indicator">
            {onboardingArray.map((item, Idx) => (
              <div
                key={Idx}
                className={`indicator_item ${
                  Idx === index ? "active" : ""
                }`}
              />
            ))}
          </div>

          <div className="Onboarding_buttons">
            <Link to="/account">
              <button className="onboarding_buttons_buttonOne">
                Skip
              </button>
            </Link>

            <button
              className="onboarding_buttons_buttonTwo"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </article>
      )}
    </>
  );
}