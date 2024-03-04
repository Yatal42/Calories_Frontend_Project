import React, { useState } from "react";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import categories from "../mealsCategorys";
import Button from "./Button";
import idb from "../idb.js"

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

function createTextField(textField, state, setState) {
    return (
        <TextField
            required
            key={textField.id}
            label={textField.label}
            value={state[textField.stateKey] || ""}
            onChange={(e) => setState({ ...state, [textField.stateKey]: e.target.value })}
        />
    );
}

function AddCalories() {
    const [mealData, setMealData] = useState({
        calories: "",
        description: "",
        category: "",
    });

    const handleAddCalories = async () => {
        try {
            await idb.addCalories(mealData);
            console.log("Meal added successfully!");
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    return (
        <div className="add-calories-container">
            <h1>Add your meal:</h1>
            {textFieldsProps.map((textField) =>
                createTextField(textField, mealData, setMealData)
            )}
            <TextField
                id="outlined-select-category"
                select
                label="Select Category"
                value={mealData.category}
                onChange={(e) => setMealData({ ...mealData, category: e.target.value })}
                helperText="Please select meal Category"
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Button text="Add calories" onClick={handleAddCalories}></Button>
        </div>
    );
}

export default AddCalories;
