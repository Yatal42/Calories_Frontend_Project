// Import React and the DatePickers component
import React from "react";
import DatePickers from "./DatePickers";

// Define the ReportBtns functional component
function ReportBtns({isLoading, db = {}, rows, setRows}){
    // Return JSX for the component
    return (
        // Use a div with a class to style the container
        <div className="report-container">
            <DatePickers isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
        </div>);
}

// Export the ReportBtns component for use in other parts of the application
export default ReportBtns;
