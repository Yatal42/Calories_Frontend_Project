import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 100,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'calories',
        headerName: 'calories',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', calories: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', calories: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', calories: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', calories: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', calories: null },
    { id: 6, lastName: 'Melisandre', firstName: null, calories: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', calories: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', calories: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', calories: 65 },
];

export default function Table() {
    return (
        <Box className="table">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                pageSizeOptions={[7]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

//