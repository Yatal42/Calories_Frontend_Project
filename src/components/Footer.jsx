// Import React for component creation
import React from "react";

// Define the Footer functional component
function Footer() {
    // Get the current year
    const year = new Date().getFullYear();
    // Return JSX for the component
    return (
        // Use the footer HTML element with a class for styling
        <footer className="footer">
            Copyright ⓒ {year}
        </footer>
    );
}

// Export the Footer component for use in other parts of the application
export default Footer;
