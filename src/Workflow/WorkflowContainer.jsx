import React, { useEffect } from 'react';
import Button from '../Common/Button';
import MaterialIcons from '../data/MaterialIcons';

const WorkflowContainer = (props) => {
  useEffect(() => {
    console.log('git');
  }, []);

  return (
    <div className="container-fluid my-2">
      <div className="row">
        {/* TODO: Here we should display all selected items */}
      </div>

      <div className="row justify-content-center">
        <div className="col-1 text-center">
          <Button icon={MaterialIcons.DOWNLOAD} loading={props.request} shadow />
        </div>
      </div>

    </div >
  );
};

export default React.memo(WorkflowContainer);
