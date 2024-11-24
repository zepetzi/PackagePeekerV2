import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';




export default function TrackingEntry() {

    const [helperText, setHelperText] = useState('');

    // const helperText = 'Invalid tracking number';

    return (
            <>                       
                <TextField 
                    error={helperText ? true : false}
                    placeholder="Enter Tracking Number" 
                    color="#E1DFDB" 
                    variant="outlined" 
                    size="small" 
                    helperText={helperText ? helperText : null}
                    autoComplete="off"
                    fullWidth
                    sx={{
                        width: '400px',
                        marginY: 0,
                        paddingY: 0,
                        // Set a fixed height for the TextField to prevent movement
                        height: '34px', // Adjust this value based on your design
                        '& .MuiFormHelperText-root': {
                            margin: 0, // Prevent margin on helper text
                            height: '20px', // Fixed height for helper text
                            fontStyle: 'italic',
                            fontFamily: 'Poppins-Light',
                        }
                    }}
                />
                
            </>
    );
}


