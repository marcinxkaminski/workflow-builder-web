
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import SelectorCarousel, * as sc from './SelectorCarousel';
import Card from '../Common/Card';
import Button from '../Common/Button';
import * as MaterialIcons from '../data/MaterialIcons';

jest.mock('../Common/Card', () => ({ item, onAdd }) => (
  <button type="button" className="Mock-Card" onClick={onAdd}>{item.name}</button>
));
jest.mock('../Common/Button', () => ({ onClick, icon }) => (
  <button type="button" className="Mock-Button" onClick={onClick}>{icon}</button>
));
jest.mock('../data/MaterialIcons', () => ({
  ARROW_LEFT: 'left',
  ARROW_RIGHT: 'right',
}));

describe('SELECTOR CAROUSEL', () => {
  let container = null;

  const renderCarousel = ({
    items, infinite, onAdd = jest.fn(() => ''), itemsVisibleCount,
  }) => {
    act(() => {
      render(
        <SelectorCarousel {...{
          items,
          infinite,
          onAdd,
          itemsVisibleCount,
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

  it('has default props', async () => {
    expect(sc.DEFAULT_INFINITE_STATE).toBe(true);
    expect(sc.DEFAULT_VISIBLE_ITEMS_COUNT).toEqual(1);
    expect(sc.DEFAULT_ITEM_INDEX).toEqual(0);
  });

  it('not renders when no items passed', async () => {
    const carousel = renderCarousel({});
    expect(!!carousel).toBe(false);
  });

  it('not renders when no onAdd function passed', async () => {
    const carousel = renderCarousel({
      items: [{
        id: 'id1',
        name: 'name1',
        materialIcon: 'icon1',
        description: 'description1',
      }],
      onAdd: null,
    });
    expect(!!carousel).toBe(false);
  });

  it('renders 2 cards and handles onAdd', async () => {
    const mockOnAdd = jest.fn(() => '');
    const mockItems = [
      {
        id: 'id1',
        name: 'name1',
        materialIcon: 'icon1',
        description: 'description1',
      },
      {
        id: 'id2',
        name: 'name2',
        materialIcon: 'icon2',
        description: 'description2',
      },
    ];
    const mockItemsVisibleCount = mockItems.length;

    const cards = renderCarousel({
      items: mockItems,
      onAdd: mockOnAdd,
      itemsVisibleCount: mockItemsVisibleCount,
    }).querySelectorAll('.Mock-Card');

    expect(cards.length).toEqual(mockItemsVisibleCount);

    cards[0].click();
    cards[1].click();

    expect(mockOnAdd).toHaveBeenNthCalledWith(1, mockItems[1]);
    expect(mockOnAdd).toHaveBeenNthCalledWith(2, mockItems[0]);
  });

  it('renders with default props and buttons that handle changing cards', async () => {
    const mockItems = [
      {
        id: 'id1',
        name: 'name1',
        materialIcon: 'icon1',
        description: 'description1',
        config: {},
      },
      {
        id: 'id2',
        name: 'name2',
        materialIcon: 'icon2',
        description: 'description2',
        config: {},
      },
      {
        id: 'id3',
        name: 'name3',
        materialIcon: 'icon3',
        description: 'description3',
        config: {},
      },
      {
        id: 'id4',
        name: 'name4',
        materialIcon: 'icon4',
        description: 'description4',
        config: {},
      },
    ];
    const mockOnAdd = jest.fn(() => '');

    const carousel = renderCarousel({ items: mockItems, onAdd: mockOnAdd });

    let cards = carousel.querySelectorAll('.Mock-Card');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[0].name);

    const buttons = carousel.querySelectorAll('.Mock-Button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].innerHTML).toEqual(MaterialIcons.ARROW_LEFT);
    expect(buttons[1].innerHTML).toEqual(MaterialIcons.ARROW_RIGHT);

    buttons[0].click();
    cards = carousel.querySelectorAll('.Mock-Card');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[mockItems.length - 1].name);

    buttons[1].click();
    buttons[1].click();
    cards = carousel.querySelectorAll('.Mock-Card');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[1].name);
  });

  it('renders with 4 cards', async () => {
    const mockItems = [
      {
        id: 'id1',
        name: 'name1',
        materialIcon: 'icon1',
        description: 'description1',
        config: {},
      },
      {
        id: 'id2',
        name: 'name2',
        materialIcon: 'icon2',
        description: 'description2',
        config: {},
      },
      {
        id: 'id3',
        name: 'name3',
        materialIcon: 'icon3',
        description: 'description3',
        config: {},
      },
      {
        id: 'id4',
        name: 'name4',
        materialIcon: 'icon4',
        description: 'description4',
        config: {},
      },
    ];
    const mockItemsNames = mockItems.map((i) => i.name).sort();
    const mockItemsVisibleCount = mockItems.length;
    const mockOnAdd = jest.fn(() => '');

    const carousel = renderCarousel({
      items: mockItems,
      onAdd: mockOnAdd,
      itemsVisibleCount: mockItemsVisibleCount,
    });
    const cards = carousel.querySelectorAll('.Mock-Card');


    expect(cards.length).toEqual(mockItemsVisibleCount);
    expect(new Array(cards.length).fill(0).map((_, i) => cards[i].innerHTML).sort())
      .toEqual(mockItemsNames);
  });

  it('gets next valid index properly', async () => {
    expect(sc.getNextIndex(0, 2)).toEqual(1);
    expect(sc.getNextIndex(1, 2, false)).toEqual(1);
    expect(sc.getNextIndex(1, 2, true)).toEqual(0);
  });

  it('gets previous valid index properly', async () => {
    expect(sc.getPreviousIndex(1, 2)).toEqual(0);
    expect(sc.getPreviousIndex(0, 2, false)).toEqual(0);
    expect(sc.getPreviousIndex(0, 2, true)).toEqual(1);
  });

  it('transforms item to display properly', async () => {
    const mockItem = {
      id: 'id1',
      name: 'mock',
      materialIcon: 'mock',
      description: 'mock',
      config: {},
    };
    const mockItemResult = {
      name: 'mock',
      materialIcon: 'mock',
      description: 'mock',
    };

    expect(sc.transformItemToDisplay(mockItem)).toEqual(mockItemResult);
  });
});
