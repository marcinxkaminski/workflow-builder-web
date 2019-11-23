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
    item,
    customClasses,
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

    return container;
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
    expect(!!card).toBe(true);
  });

  it('renders default card without any props and with item index', async () => {
    const mockIndex = 0;
    mockItem.index = mockIndex;

    const indexDiv = renderCard({ item: mockItem }).querySelector('h6');
    expect(indexDiv.innerHTML).toEqual(`#${mockIndex + 1}`);
  });

  it('renders default card without any props and with item title', async () => {
    const mockTitle = 'mock-name';
    mockItem.name = mockTitle;

    const titleDiv = renderCard({ item: mockItem }).querySelector('h4');
    expect(titleDiv.innerHTML).toEqual(mockTitle);
  });

  it('renders default card without any props and with item icon', async () => {
    const mockIcon = 'mock-icon';
    mockItem.materialIcon = mockIcon;

    const iconDiv = renderCard({ item: mockItem }).querySelector('i');
    expect(iconDiv.innerHTML).toEqual(mockIcon);
  });

  it('renders default card without any props and with item description', async () => {
    const mockDescription = 'some mocked description';
    mockItem.description = mockDescription;

    const descriptionDiv = renderCard({ item: mockItem }).querySelector('small');
    expect(descriptionDiv.innerHTML).toEqual(mockDescription);
  });

  it('renders default card with item config with result and handles on change event', async () => {
    const mockOnChange = jest.fn();

    const mockConfigData = { prop: 'mock-prop' };
    const mockConfigResults = ['some', 'results'];
    const mockConfig = { data: mockConfigData, result: mockConfigResults, isValid: true };
    mockItem.config = mockConfig;

    const card = renderCard({ item: mockItem, onChange: mockOnChange });
    const textarea = card.querySelector('textarea');
    const resultDiv = card.getElementsByClassName('text-muted small')[0];

    expect(textarea.classList.contains('is-invalid')).toBe(false);
    expect(textarea.value).toEqual(JSON.stringify(mockConfigData));
    expect(resultDiv.innerHTML).toEqual(`Result:<br> ${JSON.stringify(mockConfigResults)}`);

    textarea.focus();
    textarea.blur();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('renders default card with item invalid config', async () => {
    const mockOnChange = jest.fn();

    const mockConfigData = { prop: 'mock-prop' };
    const mockConfig = { data: mockConfigData, isValid: false };
    mockItem.config = mockConfig;

    const card = renderCard({ item: mockItem, onChange: mockOnChange });
    const textarea = card.querySelector('textarea');

    expect(textarea.classList.contains('is-invalid')).toBe(true);
    expect(textarea.value).toEqual(JSON.stringify(mockConfigData));
  });

  it('renders default card with add button', async () => {
    const mockOnAdd = jest.fn();

    const button = renderCard({ item: mockItem, onAdd: mockOnAdd }).querySelector('Button');
    button.click();

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('renders default card with delete button', async () => {
    const mockOnDelete = jest.fn();

    const button = renderCard({ item: mockItem, onDelete: mockOnDelete }).querySelector('Button');
    button.click();

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('renders default card with custom classes', async () => {
    const mockedCustomClass = 'myextraordinarymockedcustomclass';

    const card = renderCard({
      item: mockItem,
      customClasses: mockedCustomClass,
    }).getElementsByClassName(mockedCustomClass)[0];
    expect(!!card).toBe(true);
  });

  it('renders no buttons when passed both add and delete functions', async () => {
    const mockOnDelete = jest.fn();
    const mockOnAdd = jest.fn();

    const button = renderCard({ item: mockItem, onDelete: mockOnDelete, onAdd: mockOnAdd }).querySelector('Button');

    expect(!!button).toBe(false);
  });

  it('not renders any card when item is empty', async () => {
    console.warn = jest.fn();
    const cardBody = renderCard({}).getElementsByClassName('card-body')[0];

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(!!cardBody).toBe(false);
  });
});
