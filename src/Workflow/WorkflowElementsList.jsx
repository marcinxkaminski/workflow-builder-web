import React, { memo } from 'react';
import Card from '../Common/Card';

export const tranfsormItemToDisplay = ({ id, name, config }, index) => ({ id, name, config, index });

const WorkflowElementsList = (props) => {
  const { items, onDelete, onConfigChange } = props;

  return (
    <div className="row w-100 mx-auto justify-content-center align-items-center my-5">
      {items.map((item, index) => {
        const itemToDisplay = tranfsormItemToDisplay(item, index);
        return (
          <Card
            key={index}
            item={itemToDisplay}
            onDelete={() => onDelete(itemToDisplay)}
            onChange={(data) => onConfigChange(itemToDisplay, data)} />)
      })}
    </div>
  )
}

export default memo(WorkflowElementsList);
