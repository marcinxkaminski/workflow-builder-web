/* global expect, describe, jest */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';

import SelectorCarousel, * as sc from './SelectorCarousel';

describe('SELECTOR CAROUSEL', () => {
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

  it('has DEFAULT_VISIBLE_ITEMS_COUNT', async () => {
    // expect(false).toEqual(true);
  });

  it('has DEFAULT_ITEM_INDEX', async () => {
    // expect(false).toEqual(true);
  });

  it('handles getting next index properly ', async () => {
    // expect(false).toEqual(true);
  });

  it('handles getting previous index properly ', async () => {
    // expect(false).toEqual(true);
  });

  it('handles transforming item for displaying properly', async () => {
    // expect(false).toEqual(true);
  });

  it('renders both left and right button', async () => {
    // expect(false).toEqual(true);
  });

  it('renders carousel with cards', async () => {
    // expect(false).toEqual(true);
  });
});
