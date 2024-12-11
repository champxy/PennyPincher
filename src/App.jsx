import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Approutes from './routes/Approutes';

const App = () => {
  return (
    <>
      <div>
      <ToastContainer />
       <Approutes/>
      </div>
    </>
  )
}

export default App