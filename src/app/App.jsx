import React from 'react';
import WorkflowContainer from '../Workflow/WorkflowContainer';
import SelectorContainer from '../Selector/SelectorContainer';


const App = React.memo(() => {
  return (
    <div id="main-app">
      <SelectorContainer />
      <WorkflowContainer />
    </div>
  );
});

export default App
