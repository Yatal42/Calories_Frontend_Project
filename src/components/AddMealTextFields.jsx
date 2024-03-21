// Import React, TextField, MenuItem components, and categories data
import React from "react";
import { TextField, MenuItem } from "@mui/material";
import categories from "../mealsCategorys";

// Define the AddMealTextFields functional component with destructured props
function AddMealTextFields({ mealData = {}, setMealData }) { // Ensure mealData is initialized as an empty object
    // Array of properties for the text fields
    const textFieldsProps = [
        {
            id: 1,
            label: "Required Calories",
            stateKey: "calories",
        },
        {
            id: 2,
            label: "Required description",
            stateKey: "description",
        },
    ];

    // Function to handle changes in text fields and update the mealData state
    const handleTextFieldChange = (event, stateKey) => {
        const value = event.target.value;
        setMealData(prevMealData => ({ ...prevMealData, [stateKey]: value }));
    };

    // Render the text fields and a dropdown menu for selecting meal categories
    return (
        <div className="text-field-container">
            {/* Map through the textFieldsProps array to render TextField components */}
            {textFieldsProps.map((textField) => (
                <TextField
                    required    // Marks the field as required
                    key={textField.id}    // Unique key for React's rendering
                    label={textField.label}    // Label text for the field
                    value={mealData[textField.stateKey] || ""} // Update state on change, Ensure default value is provided if stateKey does not exist
                    onChange={(event) => handleTextFieldChange(event, textField.stateKey)} // Update state on change
                />
            ))}
            {/* Dropdown menu for selecting meal categories */}
            <TextField
                id="outlined-select-category"
                select // Enables the select option
                label="Select Category"
                value={mealData.category} // Controlled value for category
                onChange={(event) =>
                    setMealData(prevMealData => ({ ...prevMealData, category: event.target.value }))}
                helperText="Please select meal Category"    // Helper text for the dropdown
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

// Export the AddMealTextFields component for use in other parts of the application
export default AddMealTextFields;
