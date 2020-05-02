import React from "react";
import "./BannerCard-styles.css";

const BannerCard = ({ imageURL, text }) => {
  console.log({ imageURL })
  return (
    <div className="bannerCard">

      <img alt="cardimage" src={imageURL} className="cardImage"></img>
      <p className="cardText">{text}</p>
    </div>
  );
};

export default BannerCard;
