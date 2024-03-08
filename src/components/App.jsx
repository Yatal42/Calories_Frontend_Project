import React, {useEffect, useState} from "react";
import Heading from "./Heading";
import AddCalories from "./AddCalories";
import '../App.css';
import TableContainer from "./TableContainer";
import Footer from "./Footer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import idb from "../idb.js";


function App(){
    const [db, setDb] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        idb.openCaloriesDB("caloriesdb", 1).then((r) => {
            setDb(r)
            setIsLoading(false);
        });
    }, []); // empty dep. array to run once

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="page madimi-one-regular">
                <Heading/>
                <AddCalories isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
                <TableContainer isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
                <Footer />
            </div>
        </LocalizationProvider>);
}

export default App;