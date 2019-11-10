import React, { memo } from 'react';
import { connect } from 'react-redux'
import Button from '../Common/Button';
import { bindActionCreators } from 'redux';
import MaterialIcons from '../data/MaterialIcons';
import { deleteWorkflowElement, submitWorkflow } from './workflowActions';
import WorkflowElementsList from './WorkflowElementsList';

const WorkflowContainer = (props) => {
  const { selectedWorkflowElements, deleteWorkflowElement, submitWorkflow } = props;

  return (
    <div className="container-fluid my-2">
      <WorkflowElementsList items={selectedWorkflowElements} onDelete={deleteWorkflowElement} />

      <div className="row justify-content-center my-4">
        <div className="col text-center mb-5">
          <Button icon={MaterialIcons.DOWNLOAD} loading={props.request.status} customClasses="mx-auto" onClick={submitWorkflow} shadow />
        </div>
      </div>

    </div >
  );
};

const mapStateToProps = ({ workflowState }) => workflowState;
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteWorkflowElement,
  submitWorkflow
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer));
