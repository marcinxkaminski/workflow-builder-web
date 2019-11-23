/* global describe, expect, jest */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import WorkflowElementsList, { tranfsormItemToDisplay } from './WorkflowElementsList';
import Card from '../Common/Card';


jest.mock('../Common/Card', () => jest.fn((props) => (
  <div
    role="button"
    className="CARD-ELEMENT"
    onClick={props.onDelete}
  >
    {JSON.stringify(props.item)}
  </div>
)));

describe('WORKFLOW ELEMENTS LIST', () => {
  let container = null;

  const renderComponent = (props) => {
    act(() => {
      render(
        <WorkflowElementsList {...props} />,
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

  it('transforms properly items to display', async () => {
    const mockId = 'mockId';
    const mockName = 'mockName';
    const mockConfig = { data: { some: 'mock' } };
    const mockItem = {
      id: mockId, name: mockName, config: mockConfig, some: 'mock', v: '2',
    };
    const mockIndex = 0;

    expect(tranfsormItemToDisplay(mockItem, mockIndex)).toEqual({
      id: mockId, name: mockName, config: mockConfig, index: mockIndex,
    });
  });

  it('renders properly', async () => {
    const mockId = 'mockId';
    const mockName = 'mockName';
    const mockConfig = { data: { some: 'mock' } };
    const mockItem = {
      id: mockId, name: mockName, config: mockConfig, some: 'mock', v: '2',
    };
    const mockIndex = 0;
    const mockItems = [mockItem];

    const mockOnDelete = jest.fn();
    const mockOnConfigChange = jest.fn();

    const elementsList = renderComponent({
      items: mockItems,
      onDelete: mockOnDelete,
      onConfigChange: mockOnConfigChange,
    });

    const itemToDisplay = tranfsormItemToDisplay(mockItem, mockIndex);
    const card = elementsList.querySelector('.CARD-ELEMENT');
    expect(card.innerHTML).toEqual(JSON.stringify(itemToDisplay));

    card.click();
    expect(mockOnDelete).toHaveBeenCalledWith(itemToDisplay);
  });
});
