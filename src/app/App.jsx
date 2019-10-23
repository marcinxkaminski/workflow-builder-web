import React from 'react';
import DropzoneContainer from '../Dropzone/DropzoneContainer';
import SelectorContainer from '../Selector/SelectorContainer';


const App = React.memo(() => {
  return (
    <div className="container-fluid full-screen">
      <div className="full-screen row justify-content-center">
        <DropzoneContainer />
        <SelectorContainer />
      </div>
    </div>
  );
});

export default App
