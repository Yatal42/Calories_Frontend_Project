import Button from "./Button";
import React, {useState, useEffect} from "react";
import DatePickers from "./DatePickers";


const btnList=
    [
        {
            id:1,
            text:"Remove selected item",
        },
        {
            id: 2,
            text: "Remove all items",
        },
        {
            id:3,
            text:"Print report",
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
            {btnList.map(createButton)}
            <DatePickers />
        </div>);
}

export default ReportBtns;
