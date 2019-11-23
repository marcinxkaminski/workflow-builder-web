/* eslint-disable consistent-return */

import React, { useState, memo } from 'react';
import {
  arrayOf, func, bool, number, string, shape,
} from 'prop-types';
import Card from '../common/Card';
import Button from '../common/Button';
import * as MaterialIcons from '../data/MaterialIcons';

export const DEFAULT_INFINITE_STATE = true;
export const DEFAULT_VISIBLE_ITEMS_COUNT = 1;
export const DEFAULT_ITEM_INDEX = 0;

export const transformItemToDisplay = ({ name, materialIcon, description }) => ({
  name, materialIcon, description,
});

export const getNextIndex = (idx, itemsCount, infinite = DEFAULT_INFINITE_STATE) => {
  if (idx < itemsCount - 1) {
    return idx + 1;
  } if (infinite) {
    return (idx + 1) % itemsCount;
  }
  return idx;
};

export const getPreviousIndex = (idx, itemsCount, infinite = DEFAULT_INFINITE_STATE) => {
  if (idx > 0) {
    return idx - 1;
  } if (infinite) {
    return itemsCount - 1;
  }
  return idx;
};

const SelectorCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const {
    items = [],
    infinite = DEFAULT_INFINITE_STATE,
    onAdd = null,
    itemsVisibleCount = DEFAULT_VISIBLE_ITEMS_COUNT,
  } = props;

  if (!items.length || !onAdd) { return null; }

  const next = async () => {
    setActiveItemIndex(getNextIndex(activeItemIndex, items.length, infinite));
  };

  const previous = async () => {
    setActiveItemIndex(getPreviousIndex(activeItemIndex, items.length, infinite));
  };

  const renderCards = () => {
    const visibleItemsCount = itemsVisibleCount;
    const itemsCount = items.length;

    if (visibleItemsCount === 1 || visibleItemsCount > itemsCount) {
      const item = items[activeItemIndex];
      return (
        <Card
          item={transformItemToDisplay(item)}
          onAdd={() => onAdd(item)}
          customClasses="mx-auto"
        />
      );
    }
    const indexes = [getPreviousIndex(activeItemIndex, itemsCount, infinite)];

    new Array(visibleItemsCount - 1).fill(visibleItemsCount).forEach(() => {
      indexes.push(getNextIndex(indexes[indexes.length - 1], itemsCount, infinite));
    });

    return indexes.map((idx, i) => {
      const isMainCard = i === Math.floor(indexes.length / 2);
      const item = items[idx];
      const addItemToWorkflow = () => onAdd(item);
      return (
        <Card
          key={item.id + idx + Math.random()}
          item={transformItemToDisplay(item)}
          onAdd={addItemToWorkflow}
          customClasses={isMainCard ? '' : 'element-card-small'}
          hideButtons={!isMainCard}
        />
      );
    });
  };

  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-between align-items-center">
        <Button icon={MaterialIcons.ARROW_LEFT} onClick={previous} shadow />
        {renderCards()}
        <Button icon={MaterialIcons.ARROW_RIGHT} onClick={next} shadow />
      </div>
    </div>
  );
};

SelectorCarousel.defaultProps = {
  items: [],
  infinite: DEFAULT_INFINITE_STATE,
  itemsVisibleCount: DEFAULT_VISIBLE_ITEMS_COUNT,
  onAdd: null,
};

SelectorCarousel.propTypes = {
  items: arrayOf(shape({
    id: string,
    name: string,
    materialIcon: string,
    description: string,
  })),
  infinite: bool,
  onAdd: func,
  itemsVisibleCount: number,
};

export default memo(SelectorCarousel);
