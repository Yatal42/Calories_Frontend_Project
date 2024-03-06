import React, { useState } from "react";
import Button from "./Button";
import AddMealTextFields from "./AddMealTextFields";
import idb from "../idb";

function AddCalories() {
    const [mealData, setMealData] = useState({
        calories: "",
        description: "",
        category: "",
    });

    const handleAddCalories = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            if (!mealData || !mealData.calories || !mealData.description || !mealData.category) {
                throw new Error("Meal data is missing or incomplete.");
            }
            console.log(mealData); // Log mealData before submission

            // Use mealData to add calories to the IndexedDB
            // const result= await idb.addCalories(mealData);

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
                {mealData && <AddMealTextFields mealData={mealData} setMealData={setMealData}/>}
                <Button text="Add calories" type="submit" />
            </form>
        </div>
    );
}

export default AddCalories;