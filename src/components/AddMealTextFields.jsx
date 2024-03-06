import React from "react";
import { TextField, MenuItem } from "@mui/material";
import categories from "../mealsCategorys";

function AddMealTextFields({ mealData = {}, setMealData }) { // Ensure mealData is initialized as an empty object
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

    const handleTextFieldChange = (event, stateKey) => {
        const value = event.target.value;
        setMealData(prevMealData => ({ ...prevMealData, [stateKey]: value }));
    };

    return (
        <div className="text-field-container">
            {textFieldsProps.map((textField) => (
                <TextField
                    required
                    key={textField.id}
                    label={textField.label}
                    value={mealData[textField.stateKey] || ""} // Ensure default value is provided if stateKey does not exist
                    onChange={(event) => handleTextFieldChange(event, textField.stateKey)}
                />
            ))}
            <TextField
                id="outlined-select-category"
                select
                label="Select Category"
                value={mealData.category || ""} // Ensure default value is provided if category does not exist
                onChange={(event) =>
                    setMealData(prevMealData => ({ ...prevMealData, category: event.target.value }))}
                helperText="Please select meal Category"
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

export default AddMealTextFields;
