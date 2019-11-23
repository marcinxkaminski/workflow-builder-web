
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import App from './App';
import Selector from '../selector/SelectorContainer';
import Workflow from '../workflow/WorkflowContainer';

jest.mock('../selector/SelectorContainer',
  () => (...prop) => <span>SelectorContainer</span>);
jest.mock('../workflow/WorkflowContainer',
  () => (...prop) => <span>WorkflowContainer</span>);

describe('APP', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders properly', async () => {
    act(() => {
      render(<App />, container);
    });

    const spans = container.querySelectorAll('span');
    expect(spans[0].innerHTML).toEqual('SelectorContainer');
    expect(spans[1].innerHTML).toEqual('WorkflowContainer');
  });
});
