import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import {useEffect} from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Table({isLoading, db = {}, rows, setRows}) {

    useEffect(() => {
        if (isLoading) {
            return;
        } else {
            db.readCalories().then((result) => setRows(result));
        }
    }, [db, isLoading]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const handleDeleteClick =  (id) => {
        try {
            db.removeCalories(id);// Remove the row from the database
            db.readCalories().then((r) => setRows(r));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const columns = [
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
                initialState={{
                    pagination:{
                        paginationModel:{page:0, pageSize:5}
                    }
                }}
                pageSizeOptions={[5]}
                slots={{
                    toolbar: CustomToolbar,
                }}
            />
        </Box>
    );
}

export default Table;
