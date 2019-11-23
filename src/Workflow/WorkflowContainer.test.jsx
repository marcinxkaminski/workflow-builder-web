import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Button from '../common/Button';
import { DOWNLOAD } from '../data/MaterialIcons';
import { deleteWorkflowElement, submitWorkflow, onlineProcessing } from './workflowActions';
import WorkflowElementsList from './WorkflowElementsList';
import { PENDING, SUCCESS } from '../data/RequestStatuses';
import { WorkflowContainer } from './WorkflowContainer';

jest.mock('./WorkflowElementsList', () => jest.fn(() => (<div className="Workflow-Elements-List" />)));
jest.mock('../common/Button', () => jest.fn(() => (<div className="Button-WF" />)));
jest.mock('../data/RequestStatuses', () => ({ PENDING: 'PENDING', SUCCESS: 'SUCCESS' }));
jest.mock('../data/MaterialIcons', () => ({ DOWNLOAD: 'DOWNLOAD' }));
jest.mock('./workflowActions', () => ({
  deleteWorkflowElement: jest.fn(), submitWorkflow: jest.fn(), onlineProcessing: jest.fn(),
}));

describe('WORKFLOW CONTAINER', () => {
  let container = null;

  const renderContainer = () => {
    act(() => {
      render(
        <WorkflowContainer {...{
          selectedWorkflowElements: [],
          deleteWorkflowElement,
          submitWorkflow,
          onlineProcessing,
          request: { status: SUCCESS },
        }}
        />,
        container,
      );
    });
    return container.querySelector('div');
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders elements list and button for downloading', async () => {
    renderContainer();

    expect(!!container.querySelector('.Workflow-Elements-List')).toBe(true);

    expect(!!container.querySelector('.Button-WF')).toBe(true);
  });
});
