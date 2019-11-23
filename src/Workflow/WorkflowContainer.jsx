import React, { memo } from 'react';
import {
  func, object, arrayOf, string, shape,
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../Common/Button';
import { DOWNLOAD } from '../data/MaterialIcons';
import { deleteWorkflowElement, submitWorkflow, onlineProcessing } from './workflowActions';
import WorkflowElementsList from './WorkflowElementsList';
import { PENDING } from '../data/RequestStatuses';

export const WorkflowContainer = (props) => {
  /* istanbul ignore next */
  const {
    selectedWorkflowElements,
    deleteWorkflowElement: dispatchDelete,
    submitWorkflow: dispatchSubmit,
    onlineProcessing: dispatchOnlineProcessing,
    request,
  } = props;

  return (
    <div className="container-fluid my-2">
      <WorkflowElementsList
        items={selectedWorkflowElements}
        onDelete={dispatchDelete}
        onConfigChange={dispatchOnlineProcessing}
      />
      <div className="row justify-content-center my-4">
        <div className="col text-center mb-5">
          <Button
            icon={DOWNLOAD}
            loading={request.status === PENDING}
            customClasses="mx-auto"
            onClick={dispatchSubmit}
            shadow
          />
        </div>
      </div>

    </div>
  );
};

WorkflowContainer.propTypes = {
  selectedWorkflowElements: arrayOf(shape({
    id: string,
    name: string,
    materialIcon: string,
    description: string,
    config: object,
  })).isRequired,
  deleteWorkflowElement: func.isRequired,
  submitWorkflow: func.isRequired,
  onlineProcessing: func.isRequired,
  request: shape({
    status: string.isRequired,
    error: object,
  }).isRequired,
};

const mapStateToProps = ({ workflowState }) => workflowState;
const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteWorkflowElement,
  submitWorkflow,
  onlineProcessing,
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer));
