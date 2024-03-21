// Import React for component creation
import React from "react";

// Define the Button functional component with props
function Button(props){
    // Return JSX for the component
    return (
        // Render a button element with a class and display the text passed via props
        <button className="button">{props.text}</button>
    );
}

// Export the Button component for use in other parts of the application
export default Button;
