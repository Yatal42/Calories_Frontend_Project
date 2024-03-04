import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function DatePickers() {
    const [selectedYear, setSelectedYear] = useState(dayjs());

    return (
        <div className="date-pickers-container">
            <DatePicker
                sx={{ width: "35%" }}
                slotProps={{ textField: { helperText: "Yearly report", size: "small"}}}
                views={["year"]}
                value={selectedYear}
                onChange={date => setSelectedYear(date)}
                disableFuture
            />
            <DatePicker
                sx={{ width: "35%" }}
                slotProps={{ textField: { helperText: "Monthly report", size: "small" }}}
                views={["month"]}
                value={selectedYear}
                onChange={date => setSelectedYear(date)}
                disableFuture
            />
        </div>
    );
}

export default DatePickers;
