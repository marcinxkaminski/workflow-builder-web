import React from 'react';

const DropzoneContainer = React.memo(() => {
  return (
    <div className="my-4 p-2 col-11 align-self-start rounded shadow dropzone">
      <div className="row border border-blue">
      </div>
    </div>
  );
});

export default DropzoneContainer;
