// Import React, useState hook, DatePicker component, and dayjs library
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

// Define the DatePickers functional component
function DatePickers() {
    // Initialize state for selectedYear using the dayjs library to get the current date
    const [selectedYear, setSelectedYear] = useState(dayjs());
    
    // Return JSX for the component
    return (
        // Use a div to contain the DatePickers with a specific class for styling
        <div className="date-pickers-container">
            {/* Initialize the DatePicker for selecting a year with specific styles and properties */}
            <DatePicker
                sx={{ width: "35%" }} // Apply inline styles for width
                slotProps={{ textField: { helperText: "Yearly report", size: "small"}}} // Set properties for the input field
                views={["year"]} // Limit the DatePicker view to years only
                value={selectedYear} // Bind the value to the selectedYear state
                onChange={date => setSelectedYear(date)} // Update state when a new date is selected
                disableFuture // Disable selection of future dates
            />
            <DatePicker
                sx={{ width: "35%" }} // Apply inline styles for width
                slotProps={{ textField: { helperText: "Monthly report", size: "small" }}} // Set properties for the input field
                views={["month"]} // Limit the DatePicker view to months only
                value={selectedYear} // Bind the value to the selectedYear state
                onChange={date => setSelectedYear(date)} // TODO : CHANGE.
                disableFuture // Disable selection of future dates
            />
        </div>
    );
}

// Export the DatePickers component for use in other parts of the application
export default DatePickers;
