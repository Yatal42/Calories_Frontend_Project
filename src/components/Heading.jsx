import React from "react";

function Heading() {
  const date = new Date(2024,1,1,21);
  const currentTime = date.getHours();
  let greeting;
  const customStyle = {
    color: "",
  };

  if (currentTime < 12) {
    greeting = "Good morning";
    customStyle.color = "#FFC300";
  } else if (currentTime < 20) {
    greeting = "Good Afternoon";
    customStyle.color = "#FF5733";
  } else {
    greeting = "Good Night";
    customStyle.color = "#C70039";
  }

  return (
      <h1 className="heading" style={customStyle}>
        {greeting}
      </h1>

  );
}
export default Heading;
