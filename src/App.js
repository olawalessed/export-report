import logo from './logo.svg';
import './App.css';
import ModalContent from './component/ModalContent';
import { useState } from 'react';
import { Box, Modal, Snackbar, Alert } from '@mui/material';

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


  // Modal state and methods
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => { setOpenModal(true) }
  const closeModal = () => { setOpenModal(false) }
  

  // Snackbar methods here
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <div className="App">
      <button
        onClick={handleOpenModal}
        style={{
          paddingBlock: "10px",
          paddingInline: "20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          fontSize: "25px",
        }}
      >
        Export Report
      </button>

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
          <Box sx={{ marginBottom: "40px" }}>
            <ModalContent closeModal={closeModal} setOpenSnackBar={() => setOpenSnackBar(true)} />
          </Box>
        </Box>
      </Modal>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: "100%" }}>
          Data successfully exported!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
