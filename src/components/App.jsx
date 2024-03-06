import React from "react";
import Heading from "./Heading";
import AddCalories from "./AddCalories";
import '../App.css';
import TableContainer from "./TableContainer";
import Footer from "./Footer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import idb from "../idb";

function App(){

    // async function test() {
    //     try {
    //         const db = await idb.openCaloriesDB("caloriesdb", 1);
    //         // Do something with the database...
    //     } catch (error) {
    //         console.error("Error opening database:", error);
    //     }
    // }
    //
    // test();

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="page madimi-one-regular">
            <Heading/>
            <AddCalories />
            <TableContainer />
            <Footer />
        </div>
        </LocalizationProvider>);
}

export default App;

