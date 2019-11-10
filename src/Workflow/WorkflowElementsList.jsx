import React, { memo } from 'react';
import Card from '../Common/Card';

export const tranfsormItemToDisplay = ({ id, name, config: { data } }) => ({
  id, name, config: data
});

const WorkflowElementsList = (props) => {
  const { items, onDelete } = props;

  return (
    <div className="row w-100 mx-auto justify-content-center align-items-center my-5">
      {items.map((item, idx) => (
        <Card key={idx} index={idx} item={tranfsormItemToDisplay(item)} onDelete={() => onDelete(idx)} />
      ))}
    </div>
  )
}

export default memo(WorkflowElementsList);
