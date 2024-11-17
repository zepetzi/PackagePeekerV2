import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';

function TrackingCard({ trackingNumber, carrier, status, eta }) {
    return (
        <Paper
        sx={{
            width: '100%',
            backgroundColor: '#242424',
            padding: 2,
            marginBottom: 1
        }}
        >
        <Box>


        <Typography 
        variant="body2" 
        sx={{ 
            color: '#E1DFDB',
            fontFamily: 'Poppins-Regular'
        }}
        >
        Tracking Number: {trackingNumber}
        <LinearProgress variant="determinate" value={50} sx={{
            backgroundColor: '#606060',
            height: '10px',
            borderRadius: '10px'
        }} />
        
        </Typography>
        
        <Typography
        variant="body2"
        sx={{
            color: '#E1DFDB',
            fontFamily: 'Poppins-Regular'
        }}
        >
        Carrier: {carrier}
        </Typography>

        <Typography
        variant="body2" 
        sx={{
            color: '#E1DFDB',
            fontFamily: 'Poppins-Regular'
        }}
        >
        Status: {status}
        </Typography>

        <Typography
            variant="body2"
            sx={{
                color: '#E1DFDB', 
                fontFamily: 'Poppins-Regular'
        }}
        >
        ETA: {eta}
        </Typography>
        </Box>
    </Paper>
    );
}

export default TrackingCard;
