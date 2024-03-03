import Button from "./Button";
import React, {useState, useEffect} from "react";
import {Box, DateCalendar, dayjs} from "@mui/material";


const btnsText=
    [
        {
            id:1,
            text:"Remove selected items",
        },
        {
            id: 2,
            text: "Remove all items",
        },
    ];

function createButton(textField) {
    return (
        <Button
            key={textField.id}
            text={textField.text}
        />
    );
}
function ReportBtns(){

    return (
        <div className="report-btns">
            {btnsText.map(createButton)}
            <Button text={'"month" and "year"'}>
                <DateCalendar
                    defaultValue={dayjs('2022-04-17')}
                    views={['month', 'year']}
                    openTo="month"
                />
            </Button>
        </div>);
}

export default ReportBtns;

// {
//     id:3,
//         text: "Monthly report",
//     onClick:setMonthlyReport(true),
// },
// {
//     id:4,
//         text: "Yearly report"
// }