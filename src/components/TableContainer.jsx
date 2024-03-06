import React from "react";
import Table from "./Table";
import ReportBtns from "./ReportBtns";

function TableContainer(db)
{
    return(
        <div className={"table-container"}>
            <ReportBtns />
            <Table db={db} />
        </div>
    );
}

export default TableContainer;