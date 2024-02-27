import React from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {MenuItem} from "@mui/material";
import categorys from "../mealsCategorys";
import textFieldsProps from "../textFieldsProps";

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
    <div className="add-calories">
        <div className="top">
            <h1>Add your meal:</h1>
        </div>
        <div className="middle">
            {textFieldsProps.map(createTextField)}
            <TextField id="outlined-select-category" select label="Select Category" helperText="Please select meal Category">
                {categorys.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>))}
            </TextField><br/><br/>
        </div>
        <div className="bottom">
            <Button className="custom-button">Add calories</Button>
        </div>
    </div>);
}

export default AddCalories;

