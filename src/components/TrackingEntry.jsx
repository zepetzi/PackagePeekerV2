import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function TrackingEntry() {
    return (
        // <Box
        // component="form"
        // sx={{ '& > :not(style)': { m: 2, width: '25ch' } }}
        // noValidate
        // autoComplete="on"
        // >
            // </Box>
            <>

                        
                <TextField 
                    placeholder="Enter Tracking Number" 
                    color="#E1DFDB" 
                    variant="outlined" 
                    size="small" 
                    autoComplete="off"
                    fullWidth
                    sx={{
                        width: '400px'
                    }}
                />
                
            </>

    );
}


