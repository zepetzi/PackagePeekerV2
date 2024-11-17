import React from 'react';
import TrackingEntry from './TrackingEntry';
// import RefreshButton from './RefreshButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TitleIcon from './TitleIcon';
// import TitleSection from './TitleSection';
import { Typography } from '@mui/material';
import { Grid2 } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PlusIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';



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
            backgroundColor: '#242424',
            zIndex: 9999,
            isolation: 'isolate'
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
            width: '100%',
            id: 'BOXXXX',
          }}
          >

        <Grid2 container spacing={1} sx={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}} >   
          <Grid2 size={12}>
            <TitleIcon />
          </Grid2>
          <Grid2 size={12}>
          <Box
          padding={0}
          margin={0}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            height: '100%',
            width: '100%',
            id: 'BOXXXX2',
            // gap: 0
          }}
          >
            <TrackingEntry />
            <LoadingButton
                variant="contained"
                color="primary"
                startIcon={<PlusIcon />}
                sx={{
                  minWidth: '50px',
                  width: '50',
                  height: '34px',
                  padding: '0',
                  color: '#E1DFDB',
                  backgroundColor: '#606060',
                  '& .MuiButton-startIcon': {
                    margin: 0
                  }
                }}
            >
            </LoadingButton>
            <LoadingButton
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                sx={{
                  minWidth: '50px',
                  width: '50px',
                  height: '34px',
                  padding: '0',
                  color: '#E1DFDB',
                  backgroundColor: '#606060', 
                  '& .MuiButton-startIcon': {
                    margin: 0
                  }
                }}
            >
            </LoadingButton>
          </Box>
          </Grid2>
        </Grid2>
        </Box>
        </Paper>
    </>
  );
}

export default TopBar;

    