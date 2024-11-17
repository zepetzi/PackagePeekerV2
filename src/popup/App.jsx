import { useState } from 'react'
import './App.css'
import TopBar from '../components/TopBar'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TrackingCard from '../components/TrackingCard';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ 
        height: '800px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TopBar />

        <div style={{
          marginTop: '150px', 
          overflowY: 'auto',
          flex: 1
        }}>
        <Stack margin={1}>
        <TrackingCard />
        </Stack>
          
        
        </div>


      </div>
    </>
  )
}

export default App
