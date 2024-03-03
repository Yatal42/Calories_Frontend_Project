import React from "react";
import Heading from "./Heading";
import AddCalories from "./AddCalories";
import '../App.css';
import TableContainer from "./TableContainer";
import Footer from "./Footer";


function App(){
    return(
        <div className="page madimi-one-regular">
            <Heading/>
            <AddCalories />
            <TableContainer />
            <Footer />
        </div>);
}

export default App;

