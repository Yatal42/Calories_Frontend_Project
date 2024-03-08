import React from "react";

function Heading() {
  const date = new Date();
  const currentTime = date.getHours();
  let greeting="My calories ";

  if (currentTime < 12 && currentTime > 5 ) {
    greeting += "Good morning";
  } else if (currentTime < 20 && currentTime>16) {
    greeting += "Good Afternoon";
  } else if (currentTime<5) {
    greeting += "Good Night";
  }

  return (
      <div className="heading-container">
        <span className="material-symbols-rounded">dinner_dining</span>
        <h1 className="heading">
          {greeting}
        </h1>
      </div>

  );
}

export default Heading;
