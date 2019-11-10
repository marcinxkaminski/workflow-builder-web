import React, { useState, memo } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import MaterialIcons from '../data/MaterialIcons';

export const DEFAULT_VISIBLE_ITEMS_COUNT = 1;
export const DEFAULT_ITEM_INDEX = 0;

export const transformItemToDisplay = ({ name, materialIcon, description }) => ({ name, materialIcon, description });

export const getNextIndex = (idx, itemsCount, infinite) => {
  if (idx < itemsCount - 1) {
    return idx + 1;
  } else if (infinite) {
    return (idx + 1) % itemsCount;
  } else {
    return idx;
  }
}

export const getPreviousIndex = (idx, itemsCount, infinite) => {
  if (idx > 0) {
    return idx - 1;
  } else if (infinite) {
    return itemsCount - 1;
  } else {
    return idx;
  }
}

const SelectorCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { items, infinite, onAdd, itemsVisibleCount } = props;

  const next = async () => {
    setActiveItemIndex(getNextIndex(activeItemIndex, items.length, infinite));
  }

  const previous = async () => {
    setActiveItemIndex(getPreviousIndex(activeItemIndex, items.length, infinite));
  }

  const renderCards = () => {
    const visibleItemsCount = itemsVisibleCount || DEFAULT_VISIBLE_ITEMS_COUNT;
    const itemsCount = items.length;

    if (visibleItemsCount === 1 || visibleItemsCount > itemsCount) {
      const item = items[activeItemIndex];
      return <Card item={transformItemToDisplay(item)} onAdd={() => onAdd(item)} customClasses='mx-auto' />;
    } else if (visibleItemsCount > 1) {
      const indexes = [getPreviousIndex(activeItemIndex, itemsCount, infinite)];

      for (var i = 0; i < visibleItemsCount - 1; ++i) {
        indexes.push(getNextIndex(indexes[indexes.length - 1], itemsCount, infinite));
      }

      return indexes.map((idx, i) => {
        const isMainCard = i === Math.floor(indexes.length / 2);
        const item = items[idx];
        return <Card
          key={idx}
          item={transformItemToDisplay(item)}
          onAdd={() => onAdd(item)}
          customClasses={isMainCard ? '' : 'element-card-small'}
          hideButtons={!isMainCard}
        />
      });
    }
  }

  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-between align-items-center">
        <Button icon={MaterialIcons.ARROW_LEFT} onClick={previous} shadow />
        {renderCards()}
        <Button icon={MaterialIcons.ARROW_RIGHT} onClick={next} shadow />
      </div>
    </div>

  )
};

export default memo(SelectorCarousel);
