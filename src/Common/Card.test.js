/* global expect, describe */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Card from './Card';

describe('CARD', () => {
  let container = null;
  let mockItem = null;

  const defaultMockItem = {
    id: null,
    name: null,
    description: null,
    materialIcon: null,
    config: null,
  };

  const renderCard = ({
    item = {},
    customClasses = '',
    hideButtons,
    onAdd,
    onDelete,
    onChange,
  }) => {
    act(() => {
      render(<Card {...{
        item, hideButtons, onAdd, onDelete, onChange, customClasses,
      }}
      />, container);
    });

    return container.querySelector('button');
  };

  beforeEach(() => {
    mockItem = defaultMockItem;
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders default card without any props', async () => {
    const card = renderCard({ item: mockItem });
    expect(card).toBeDefined();
  });

  it('renders default card without any props and with item index', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card without any props and with item title', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card without any props and with item icon', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card without any props and with item description', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card with item confing and handles on change event', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card with add button', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card with delete button', async () => {
    // expect(false).toEqual(true);
  });

  it('renders default card with custom classes', async () => {
    // expect(false).toEqual(true);
  });

  it('renders no buttons when passed both add and delete functions', async () => {
    // expect(false).toEqual(true);
  });

  it('renders cards with all vailable params', async () => {
    // expect(false).toEqual(true);
  });
});
