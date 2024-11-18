import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';
import { Grid2 } from '@mui/material';

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
                <Grid2 container spacing={0.2}>
                    <Grid2 size={9}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#E1DFDB',
                                fontFamily: 'Poppins-SemiBold',
                                display: 'inline'
                            }}
                        >
                            Tracking Number:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#E1DFDB',
                                fontFamily: 'Poppins-Regular',
                                display: 'inline'
                            }}
                        >
                            {trackingNumber}
                        </Typography>
                    </Grid2>
                    
                    <Grid2 size={3}>
                    <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#E1DFDB',
                                    fontFamily: 'Poppins-SemiBold',
                                    display: 'inline'
                                }}
                            >
                                Carrier:
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#E1DFDB',
                                    fontFamily: 'Poppins-Regular',
                                    display: 'inline'
                                }}
                            >
                                {carrier} Fedex
                            </Typography>
                        </Box>
                    </Grid2>

                    <Grid2 size={12}>
                        <LinearProgress variant="determinate" value={50} sx={{
                            backgroundColor: '#606060',
                            height: '10px',
                            borderRadius: '10px'
                        }} />
                    </Grid2>
                    
                    <Grid2 size={8}>
                        <Box>
                        <Typography
                        variant="body2" 
                        sx={{
                            color: '#E1DFDB',
                            fontFamily: 'Poppins-Regular',
                            whiteSpace: 'normal', 
                            overflowWrap: 'break-word', 
                            maxWidth: '100%',                                     
                        }}
                        >
                        {status}asdasdasdasaasdasdadsdasaas
                        </Typography>
                        </Box>
                    </Grid2>
                    
                    <Grid2 size={4}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#E1DFDB',
                                    fontFamily: 'Poppins-SemiBold',
                                    display: 'inline'
                                }}
                            >
                                ETA:
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#E1DFDB',
                                    fontFamily: 'Poppins-Regular',
                                    display: 'inline'
                                }}
                            >
                                {eta} Aug 12, 2024
                            </Typography>
                        </Box>
                    </Grid2>

                </Grid2>
            </Box>
    </Paper>
    );
}

export default TrackingCard;
