import React, { memo } from 'react';
import WorkflowContainer from '../Workflow/WorkflowContainer';
import SelectorContainer from '../Selector/SelectorContainer';


const App = () => {
  return (
    <div id="main-app">
      <SelectorContainer />
      <WorkflowContainer />
    </div>
  );
};

export default memo(App);
