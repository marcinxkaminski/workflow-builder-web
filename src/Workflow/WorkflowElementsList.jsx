import React, { memo } from 'react';
import {
  arrayOf, func, object, string, shape,
} from 'prop-types';
import Card from '../Common/Card';

export const tranfsormItemToDisplay = ({ id, name, config }, index) => ({
  id, name, config, index,
});

const WorkflowElementsList = (props) => {
  const { items, onDelete, onConfigChange } = props;

  return (
    <div className="row w-100 mx-auto justify-content-center align-items-center my-5">
      {items.map((item, index) => {
        const itemToDisplay = tranfsormItemToDisplay(item, index);
        return (
          <Card
            key={item.id + Math.random()}
            item={itemToDisplay}
            onDelete={() => onDelete(itemToDisplay)}
            onChange={(data) => onConfigChange(itemToDisplay, data)}
          />
        );
      })}
    </div>
  );
};

WorkflowElementsList.propTypes = {
  items: arrayOf(shape({
    id: string,
    name: string,
    config: object,
  })).isRequired,
  onDelete: func.isRequired,
  onConfigChange: func.isRequired,
};

export default memo(WorkflowElementsList);
