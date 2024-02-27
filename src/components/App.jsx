import React from "react";
import Heading from "./Heading";
import AddCalories from "./AddCalories";
import Report from "./Report";
import '../App.css';


function App(){
    return(
        <div>
            <Heading /><br/>
            <AddCalories className="add-calories"/><br/>
            <div className="report">
                <Report />
            </div>
        </div>);
}


export default App;

