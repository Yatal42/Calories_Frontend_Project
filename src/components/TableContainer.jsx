// Import necessary modules from React and components from local files
import React from "react";
import Table from "./Table";
import ReportBtns from "./ReportBtns";

// Define the TableContainer functional component with props
function TableContainer({isLoading, db = {}, rows, setRows})
{
    // Return JSX for the component
    return(
        <div className={"table-container"}>
            <ReportBtns isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
            <Table isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
        </div>
    );
}

// Export the TableContainer component for use in other parts of the application
export default TableContainer;
