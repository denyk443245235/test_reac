import React, { useState } from "react";
import PhotosComponent from "./componets/Photos";
import {
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import SearchFieldsComponent from "./componets/SearchFields";
import './App.css';

const Alert = (props) => (
  <MuiAlert
    elevation={6}
    variant="filled"
    {...props} />
);

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [preloader, setPreloaderVisibility] = useState(false);
  const [errorModal, showErrorModal] = useState({ visible: false, message: ''});
  
  const closeErrorModal = () => {
    showErrorModal({
      visible: false
    });
  }
  
  return (
    <div className="app-container">
      <SearchFieldsComponent
        setPhotos={setPhotos}
        showErrorModal={showErrorModal}
        setPreloaderVisibility={setPreloaderVisibility}
      />
      {preloader ?
        <CircularProgress style={{marginTop: 100}}/> :
        <PhotosComponent photos={photos}/>
      }
      <Snackbar
        open={errorModal.visible}
        onClose={closeErrorModal}
        autoHideDuration={ 2000 }>
        <Alert
          onClose={closeErrorModal}
          severity="error">{errorModal.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
