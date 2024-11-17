import React from 'react';
import TrackingEntry from './TrackingEntry';
// import RefreshButton from './RefreshButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TitleIcon from './TitleIcon';
// import TitleSection from './TitleSection';
import { Typography } from '@mui/material';
import { Grid2 } from '@mui/material';




function TopBar({ onRefresh }) {
  return (
    <>

    
        <Paper 
          sx={{  
            width: '525px',
            height: '130px',  // Add this line
            boxSizing: 'border-box',
            borderRadius: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            // bgcolor: '#1976d2'
            // bgcolor: '#212631'
            // bgcolor: '#667085'
            // bgcolor: '#4E576A',
            // bgcolor: '#17191B',
            backgroundColor: '#242424'
          }} 
          elevation={3}
      >
          <Box
          padding={1}
          sx={{ 
            display: 'flex', 
            justifyContent: 'left', 
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}
          
          >

        <Grid2 container spacing={2}>   
          <Grid2 size={12}>
            <TitleIcon />
          </Grid2>
          <Grid2 size={12}>
            <TrackingEntry />
          </Grid2>
        </Grid2>
        </Box>
        </Paper>
    </>
  );
}

export default TopBar;

    