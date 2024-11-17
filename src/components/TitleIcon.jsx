import React from 'react';
import { Typography } from '@mui/material';
import { Grid2 } from '@mui/material';

export default function TitleIcon() {
    return (
        <>
            <Grid2 container spacing={1}>
                <Typography variant="h1">PackagePeeker</Typography> 
                <img src="/public/icons/icon2ns.gif" width="32" height="32"></img>
            </Grid2>
        </>
    );
}

