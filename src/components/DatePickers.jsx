// Import React, useState hook, DatePicker component, and dayjs library
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Button from "./Button";

// Define the DatePickers functional component
function DatePickers({db = {}, setRows, selectedDate, setSelectedDate}) {

    // Define handleClick functions
    const handleMonthlyClick = async () => {
        try {
            // Convert the timestamp to a dayjs object
            const FullDate = dayjs.unix(selectedDate / 1000); // dividing by 1000 to convert milliseconds to seconds
            // Extract the month and year
            const month = FullDate.month() + 1; // dayjs months are zero-based, so we add 1 to get the correct month
            const year = FullDate.year() % 100; // extracting the last two digits of the year
            console.log("year is:"+year);
            console.log("month is:"+month);
            // Call db.readCalories with selectedYear and selectedMonth as parameters
            const caloriesData = await db.readCalories(month, year);
            // Update the rows state with the retrieved data
            setRows(caloriesData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }
    };

    const handleYearlyClick = async () => {
        try {
            // Convert the timestamp to a dayjs object
            const FullDate = dayjs.unix(selectedDate / 1000); // dividing by 1000 to convert milliseconds to seconds
            // Extract the year
            const year = FullDate.year() % 100; // extracting the last two digits of the year
            console.log("year is:"+year);
            // Call db.readCalories with selectedYear and selectedMonth as parameters
            const caloriesData = await db.readCalories(null, year);
            // Update the rows state with the retrieved data
            setRows(caloriesData);
        } catch (error) {
            console.error('Error reading data:', error); // Log any errors to the console
        }
    };

    // Return JSX for the component
    return (
        // Use a div to contain the DatePickers with a specific class for styling
        <div className="date-pickers-container">
            <DatePicker
                sx={{ width: "35%" }} // Apply inline styles for width
                slotProps={{ textField: {size: "small" }}} // Set properties for the input field
                views={["month","year"]} // Limit the DatePicker view to months and years only
                value={selectedDate} // Bind the value to the selectedYear state
                onChange={date => setSelectedDate(date)}// Set state when selected date
                disableFuture // Disable selection of future dates
            />
            <Button text="Monthly Report" onClick={handleMonthlyClick}/>
            <Button text="Yearly Report" onClick={handleYearlyClick}/>
        </div>
    );
}

// Export the DatePickers component for use in other parts of the application
export default DatePickers;
