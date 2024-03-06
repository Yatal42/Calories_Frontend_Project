import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import idb from "../idb";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function Table(db) {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetchData(); // Call the fetchData function when the component mounts

        // Create a MutationObserver to listen for changes in IndexedDB
        const observer = new MutationObserver(() => fetchData());
        observer.observe(db, { subtree: true, childList: true });

        // Clean up the observer when the component unmounts
        return () => observer.disconnect();
    }, []); // Empty dependency array ensures useEffect runs only once

    const fetchData = async () => {
        try {
            const data = await db.readCalories(); // Fetch data from the database
            setRows(data); // Update state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await db.removeCalories(id); // Remove the row from the database
            await fetchData(); // Fetch updated data from the database
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const columns = [
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 100,
            editable: true,
        },
        {
            field: 'calories',
            headerName: 'Calories',
            type: 'number',
            width: 80,
            editable: true,
        },
        {
            field: 'day',
            width: 40,
        },
        {
            field: 'month',
            width: 40,
        },
        {
            field: 'year',
            width: 40,
        },
        {
            field: 'delete',
            width: 40,
            headerName: 'Delete',
            renderCell: (params) => (
                <DeleteOutlinedIcon onClick={() => handleDeleteClick(params.row.id)} />
            ),
        },
    ];

    return (
        <Box className="table">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
