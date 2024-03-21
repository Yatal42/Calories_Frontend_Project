// Import React for component creation
import React from "react";

// Define the Heading functional component
function Heading() {
  // Get the current date and time
  const date = new Date();
  const currentTime = date.getHours();
  let greeting="My calories "; // Initialize the greeting message

  // Determine the greeting based on the current time
  if (currentTime < 12 && currentTime > 5 ) {
    greeting += "Good morning";
  } else if (currentTime < 20 && currentTime>16) {
    greeting += "Good Afternoon";
  } else if (currentTime<5) {
    greeting += "Good Night";
  }

  // Return JSX for the component
  return (
      // Use a div with a class to style the container
      <div className="heading-container">
        <span className="material-symbols-rounded">dinner_dining</span>
        <h1 className="heading">
          {greeting}
        </h1>
      </div>
  );
}

// Export the Heading component for use in other parts of the application
export default Heading;
