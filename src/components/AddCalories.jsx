import React from "react";
import {TextField} from "@mui/material";
import {MenuItem} from "@mui/material";
import categories from "../mealsCategorys";
import Button from "./Button";

const textFieldsProps=
    [
        {
            id:1,
            label:"Required Calories",
        },
        {
            id: 2,
            label: "Required description",
        },

    ];

function createTextField(textField) {
    return (
        <TextField required
            key={textField.id}
            label={textField.label}
        />
    );
}
function AddCalories(){
    return(
    <div className="add-calories-container">
            <h1>Add your meal:</h1>
            {textFieldsProps.map(createTextField)}
            <TextField id="outlined-select-category" select label="Select Category" helperText="Please select meal Category">
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>))}
            </TextField>
            <Button text="Add calories"></Button>
    </div>);
}

export default AddCalories;

