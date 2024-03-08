import React, { useState } from "react";
import Button from "./Button";
import AddMealTextFields from "./AddMealTextFields";

function AddCalories({isLoading, db = {}, rows, setRows}) {
    const [mealData, setMealData] = useState({
        calories: "",
        description: "",
        category: "",
    });

    const handleAddCalories = async (event) => {
         // Prevent default form submission behavior
        try {
            console.log(mealData); // Log mealData before submission
            // Use mealData to add calories to the IndexedDB
            db.addCalories(mealData);
            // Update the table data
            db.readCalories().then((r) => setRows(r));
            event.preventDefault();
            // Update mealData state to clear the form fields
            setMealData({
                calories: "",
                description: "",
                category: "",
            });
            console.log("Meal added successfully!");
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };


    return (
        <div>
            <form className="add-calories-container" onSubmit={handleAddCalories}>
                <h1>Add your meal:</h1>
                <AddMealTextFields mealData={mealData} setMealData={setMealData}/>
                <Button text="Add calories" type="submit" />
            </form>
        </div>
    );
}

export default AddCalories;