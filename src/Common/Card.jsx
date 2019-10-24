import React from 'react';
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
      <h3 className="card-title">{name}</h3>
    </div>
  </div>
);

const renderIcon = (icon) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <h1 className="card-subtitle mb-2">
        <i className="material-icons">{icon}</i>
      </h1>
    </div>
  </div>
);

const renderDescription = (description) => (
  <div className="row justify-content-center mb-3">
    <div className="col text-center">
      <p className="card-text">
        <small>
          {description}
        </small>
      </p>
    </div>
  </div>
);

const renderAddButton = (onAdd) => (
  <div className="row justify-content-center">
    <div className="col-5 text-center">
      <Button icon={MaterialIcons.ADD} class="btn-outline-dark" shadow={false} onClick={onAdd} />
    </div>
  </div>
);

const renderDeleteButton = (onDelete) => (
  <div className="row justify-content-center">
    <div className="col-5 text-center">
      <Button icon={MaterialIcons.DELETE} class="btn-outline-dark" shadow={false} onClick={onDelete} />
    </div>
  </div>
);

const renderConfig = (config) => (
  <div className="card-footer">
    <small className="text-muted">
      {/* TODO: Display config */}
    </small>
  </div>
);

const Card = props => {
  const { item: { name, description, materialIcon, config }, index, onAdd, onDelete } = props;

  return (
    <div className="card element-card text-center">
      <div className="card-body">

        {typeof index !== 'undefined' ? renderIndex(index) : null}
        {name ? renderTitle(name) : null}
        {materialIcon ? renderIcon(materialIcon) : null}
        {description ? renderDescription(description) : null}

        {onAdd ? renderAddButton(onAdd) : null}
        {onDelete ? renderDeleteButton(onDelete) : null}
      </div>
      {Object.keys(config).length ? renderConfig(config) : null}
    </div>
  );
};

export default React.memo(Card);
