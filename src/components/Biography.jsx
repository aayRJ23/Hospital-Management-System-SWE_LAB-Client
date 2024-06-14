import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="biography-container">
      <div className="biography-image">
        <img src={imageUrl} alt="whoweare" />
      </div>
      <div className="biography-content">
        <h2>About MedConnect</h2>
        <h3>Your Partner in Health</h3>
        <p>
          At MedConnect, we believe in providing not just healthcare, but a holistic experience that nurtures your well-being. Our institute is equipped with state-of-the-art facilities and a dedicated team that ensures you receive the highest standard of care. Whether it's routine check-ups or specialized treatments, we are here to support you every step of the way.
        </p>
        <p>
          Join us as we revolutionize healthcare, making it more accessible, personalized, and compassionate. Your health is our mission, and we are committed to helping you achieve the best possible outcomes.
        </p>
      </div>
    </div>
  );
};

export default Biography;
