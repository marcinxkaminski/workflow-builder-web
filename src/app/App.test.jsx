/* global expect, describe, jest */

import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import App from './App';
import WorkflowContainer from '../Workflow/WorkflowContainer';
import SelectorContainer from '../Selector/SelectorContainer';

jest.mock('../Workflow/WorkflowContainer');
jest.mock('../Selector/SelectorContainer');

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

    expect(container.querySelector('WorkflowContainer')).toBeDefined();
    expect(container.querySelector('SelectorContainer')).toBeDefined();
  });
});
