import React from "react";
import Table from "./Table";
import ReportBtns from "./ReportBtns";

function TableContainer({isLoading, db = {}, rows, setRows})
{

    return(
        <div className={"table-container"}>
            <ReportBtns />
            <Table isLoading={isLoading} db={db} rows={rows} setRows={setRows}/>
        </div>
    );
}

export default TableContainer;