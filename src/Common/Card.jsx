import React, { memo } from 'react';
import Button from './Button';
import MaterialIcons from '../data/MaterialIcons';

const renderIndex = (index) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <h6>{`#${index + 1}`}</h6>
    </div>
  </div>
);

const renderTitle = (name) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <h4 className="card-title">{name}</h4>
    </div>
  </div>
);

const renderIcon = (icon) => (
  <div className="row justify-content-center my-2">
    <div className="col text-center">
      <div className="card-subtitle">
        <i className="material-icons">{icon}</i>
      </div>
    </div>
  </div>
);

const renderDescription = (description) => (
  <div className="row justify-content-center mb-3">
    <div className="col text-center">
      <div className="card-text">
        <small className="text-muted">
          {description}
        </small>
      </div>
    </div>
  </div>
);

const renderAddButton = (onAdd) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <Button icon={MaterialIcons.ADD} customClasses="btn-outline-dark mx-auto" shadow={false} onClick={onAdd} />
    </div>
  </div>
);

const renderDeleteButton = (onDelete) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <Button icon={MaterialIcons.DELETE} customClasses="btn-outline-dark mx-auto" shadow={false} onClick={onDelete} />
    </div>
  </div>
);

const renderConfig = (config, result = null) => (
  <div className="card-footer p-0">
    <textarea className="form-control" defaultValue={JSON.stringify(config)} />
    <small className="text-muted">
      Result: {result ? JSON.stringify(result) : null}
    </small>
  </div>
);

const Card = (props) => {
  const { item = {}, index, customClasses = '', hideButtons, onAdd, onDelete } = props;

  if (!Object.keys(item).length) {
    console.error('Cannot render card for this item:', item);
    return null;
  }

  return (
    <div className={`card element-card shadow text-center m-2 ${customClasses}`}>
      <div className="card-body">

        {typeof index !== 'undefined' ? renderIndex(index) : null}
        {item.name ? renderTitle(item.name) : null}
        {item.materialIcon ? renderIcon(item.materialIcon) : null}
        {item.description ? renderDescription(item.description) : null}

        {onAdd && !hideButtons ? renderAddButton(onAdd) : null}
        {onDelete && !hideButtons ? renderDeleteButton(onDelete) : null}

      </div>
      {Object.keys(item.config || {}).length ? renderConfig(item.config) : null}
    </div>
  );
};

export default memo(Card);
