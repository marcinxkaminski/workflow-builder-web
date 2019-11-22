import React, { memo } from 'react';
import { connect } from 'react-redux'
import Button from '../Common/Button';
import { DOWNLOAD } from '../data/MaterialIcons';
import { deleteWorkflowElement, submitWorkflow, onlineProcessing } from './workflowActions';
import WorkflowElementsList from './WorkflowElementsList';
import { PENDING } from '../data/RequestStatuses';

export const WorkflowContainer = (props) => {
  /* istanbul ignore next */
  const { selectedWorkflowElements, deleteWorkflowElement, submitWorkflow, onlineProcessing, request } = props;

  return (
    <div className="container-fluid my-2">
      <WorkflowElementsList items={selectedWorkflowElements} onDelete={deleteWorkflowElement} onConfigChange={onlineProcessing} />
      <div className="row justify-content-center my-4">
        <div className="col text-center mb-5">
          <Button icon={DOWNLOAD} loading={request.status === PENDING} customClasses="mx-auto" onClick={submitWorkflow} shadow />
        </div>
      </div>

    </div >
  );
};

const mapStateToProps = ({ workflowState }) => workflowState;
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteWorkflowElement,
  submitWorkflow,
  onlineProcessing
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer));
