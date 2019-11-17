/* global expect, describe, jest */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import SelectorCarousel, * as sc from './SelectorCarousel';
import Card from '../Common/Card';
import Button from '../Common/Button';
import * as MaterialIcons from '../data/MaterialIcons';

jest.mock('../Common/Card', () => ({ item, onAdd }) => (<span onClick={onAdd}>{item.name}</span>));
jest.mock('../Common/Button', () => ({ onClick, icon }) => (<button onClick={onClick}>{icon}</button>));
jest.mock('../data/MaterialIcons', () => ({ ARROW_LEFT: 'left', ARROW_RIGHT: 'right' }));

describe('SELECTOR CAROUSEL', () => {
  let container = null;

  const renderCarousel = ({
    items, infinite, onAdd, itemsVisibleCount,
  }) => {
    act(() => {
      render(<SelectorCarousel {...{ items, infinite, onAdd, itemsVisibleCount, }} />, container);
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
    const carousel = renderCarousel({ items: [{ some: 'mock' }], onAdd: null });
    expect(!!carousel).toBe(false);
  });

  it('renders two cards and handles onAdd', async () => {
    const mockOnAdd = jest.fn();
    const mockItems = [{ some: 'mock1' }, { some: 'mock2' }];
    const mockItemsVisibleCount = mockItems.length;

    const cards = renderCarousel({ items: mockItems, onAdd: mockOnAdd, itemsVisibleCount: mockItemsVisibleCount }).querySelectorAll('span');

    expect(cards.length).toEqual(mockItemsVisibleCount);

    cards[0].click();
    cards[1].click();

    expect(mockOnAdd).toHaveBeenNthCalledWith(1, mockItems[1]);
    expect(mockOnAdd).toHaveBeenNthCalledWith(2, mockItems[0]);
  });

  it('renders with default props and buttons that handle changing cards', async () => {
    const mockItems = [{ name: 'mock1' }, { name: 'mock2' }, { name: 'mock3' }, { name: 'mock4' }];
    const mockOnAdd = jest.fn();

    const carousel = renderCarousel({ items: mockItems, onAdd: mockOnAdd });

    let cards = carousel.querySelectorAll('span');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[0].name);

    const buttons = carousel.querySelectorAll('button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].innerHTML).toEqual(MaterialIcons.ARROW_LEFT);
    expect(buttons[1].innerHTML).toEqual(MaterialIcons.ARROW_RIGHT);

    buttons[0].click();
    cards = carousel.querySelectorAll('span');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[mockItems.length - 1].name);

    buttons[1].click();
    buttons[1].click();
    cards = carousel.querySelectorAll('span');
    expect(cards.length).toEqual(sc.DEFAULT_VISIBLE_ITEMS_COUNT);
    expect(cards[0].innerHTML).toEqual(mockItems[1].name);
  });

  it('renders with 4 cards', async () => {
    const mockItems = [{ name: 'mock1' }, { name: 'mock2' }, { name: 'mock3' }, { name: 'mock4' }];
    const mockItemsNames = mockItems.map(i => i.name).sort();
    const mockItemsVisibleCount = mockItems.length;
    const mockOnAdd = jest.fn();

    const carousel = renderCarousel({ items: mockItems, onAdd: mockOnAdd, itemsVisibleCount: mockItemsVisibleCount });
    const cards = carousel.querySelectorAll('span');

    expect(cards.length).toEqual(mockItemsVisibleCount);

    let cardsContent = [];
    for (var i = 0; i < cards.length; ++i) {
      cardsContent.push(cards[i].innerHTML);
    }

    expect(cardsContent.sort()).toEqual(mockItemsNames)
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
    const mockItem = { name: 'mock', materialIcon: 'mock', description: 'mock', some: 'mock' };
    const mockItemResult = { name: 'mock', materialIcon: 'mock', description: 'mock' };

    expect(sc.transformItemToDisplay(mockItem)).toEqual(mockItemResult);
  });
});
