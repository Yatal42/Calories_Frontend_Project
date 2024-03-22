// Import React, useState hook, and custom components
import React, { useState } from "react";
import Button from "./Button";
import AddMealTextFields from "./AddMealTextFields";

// Define the AddCalories functional component with destructured props
function AddCalories({db = {}, setRows, setSelectedDate}) {
    // Initialize state for mealData with default empty values
    const [mealData, setMealData] = useState({
        calories: "",
        description: "",
        category: "",
    });

    // Define an asynchronous event handler for form submission
    const handleAddCalories = async (event) => {
         // Prevent default form submission behavior
        try {
            console.log(mealData); // Log mealData before submission
            // Use mealData to add calories to the IndexedDB
            db.addCalories(mealData);
            //Reset the selectedDate to preview the
            setSelectedDate(null);
            // Update the table data
            db.readCalories().then((r) => setRows(r));
            event.preventDefault();    // Prevent default form submission behavior
            // Reset mealData state to clear the form fields
            setMealData({
                calories: "",
                description: "",
                category: "",
            });
            // Success message
            console.log("Meal added successfully!");
            window.confirm("Meal added successfully!");
        } catch (error) {
            console.error("Error adding meal:", error); // Error message
        }
    };

    // Render the form with text fields and a submit button
    return (
        // Render inside a div h1 title, text field for meal data, and submit button
        <div>
            <form className="add-calories-container" onSubmit={handleAddCalories}>
                <h1>Add your meal:</h1>
                <AddMealTextFields mealData={mealData} setMealData={setMealData}/>
                <Button text="Add calories" type="submit" />
            </form>
        </div>
    );
}

// Export the AddCalories component for use in other parts of the application
export default AddCalories;
