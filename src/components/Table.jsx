// Import React and Material-UI components
import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import {useEffect} from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// Define the Table functional component with props
function Table({isLoading, db = {}, rows, setRows}) {

    // Use the useEffect hook to perform side effects in the component
    useEffect(() => {
        // Check if data is still loading
        if (isLoading) {
            return; // If so, do nothing and wait
        } else {
            // If not, read data from the database and update the rows state
            db.readCalories().then((result) => setRows(result));
        }
    }, [db, isLoading]); // Re-run the effect when db or isLoading changes

    // Define a custom toolbar component for the DataGrid
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    // Define a function to handle delete button clicks
    const handleDeleteClick =  (id) => {
        try {
            db.removeCalories(id); // Remove the row from the database
            db.readCalories().then((r) => setRows(r)); // Re-fetch the data to update the UI
        } catch (error) {
            console.error('Error deleting data:', error); // Log any errors to the console
        }
    };
    
    // Define the columns for the DataGrid
    const columns = [
        // Define each column with field, headerName, width, and other properties
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            editable: true,
        },
        {
            field: 'calories',
            headerName: 'Calories',
            type: 'number',
            width: 100,
            editable: true,
        },
        {
            field: 'day',
            width: 60,
        },
        {
            field: 'month',
            width: 60,
        },
        {
            field: 'year',
            width: 60,
        },
        {
            field: 'delete',
            width: 60,
            headerName: 'Delete',
            // Use a custom renderCell function to render the delete icon in each row
            renderCell: (params) => (
                <DeleteOutlinedIcon onClick={() => handleDeleteClick(params.row.id)} />
            ),
        },
    ];

    // Return JSX for the Table component
    return (
        // Use the Box component from Material-UI to wrap the DataGrid
        <Box className="table">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination:{
                        paginationModel:{page:0, pageSize:5}  // Set initial pagination state
                    }
                }}
                pageSizeOptions={[5]}  // Set the options for page size
                slots={{
                    toolbar: CustomToolbar,  // Use the CustomToolbar component for the DataGrid toolbar slot
                }}
            />
        </Box>
    );
}

// Export the Table component for use in other parts of the application
export default Table;
