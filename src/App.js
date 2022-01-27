import logo from './logo.svg';
import './App.css';
import ModalContent from './component/ModalContent';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';

const styleOne = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  
};




function App() {

  const [openModal, setOpenModal] = useState(false)


  const handleOpenModal = () => { setOpenModal(true) }
  const closeModal = () => {setOpenModal(false)}


  return (
    <div className="App">
      <button onClick={handleOpenModal} style={{paddingBlock: "10px", paddingInline: "20px", backgroundColor: "black", color: "white", border: "none", fontSize: "25px"}} >Export Report</button>

      <Modal open={openModal} onClose={closeModal}>
        <Box sx={styleOne}>
          <div
            style={{
              backgroundColor: "#EBEBEB",
              paddingInline: "25px",
              paddingBlock: "0.5px",
              marginBottom: "35px",
            }}
          >
            <h3>Export Report</h3>
          </div>
          <Box sx={{marginBottom: "40px" }}>
            <ModalContent closeModal={closeModal} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
