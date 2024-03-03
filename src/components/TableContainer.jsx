import React from "react";
import Table from "./Table";
import ReportBtns from "./ReportBtns";

function TableContainer()
{
    return(
        <div className={"table-container"}>
            <ReportBtns />
            <Table />
        </div>
    );
}

export default TableContainer;