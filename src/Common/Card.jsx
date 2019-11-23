/* eslint-disable consistent-return */

import React, { memo } from 'react';
import {
  shape, func, string, bool,
} from 'prop-types';
import Button from './Button';
import * as MaterialIcons from '../data/MaterialIcons';
import WorkflowElement from '../models/WorkflowElement';

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
      <Button
        icon={MaterialIcons.ADD}
        customClasses="btn-outline-dark mx-auto"
        shadow={false}
        onClick={onAdd}
      />
    </div>
  </div>
);

const renderDeleteButton = (onDelete) => (
  <div className="row justify-content-center">
    <div className="col text-center">
      <Button
        icon={MaterialIcons.DELETE}
        customClasses="btn-outline-dark mx-auto"
        shadow={false}
        onClick={onDelete}
      />
    </div>
  </div>
);

const renderConfig = (config, onChange) => (
  <div className="card-footer overflow-auto p-0 small font-weight-light">
    <textarea
      className={`smallest form-control${config.isValid === false ? ' is-invalid' : ''}`}
      defaultValue={JSON.stringify(config.data)}
      onBlur={({ target }) => onChange(target.value)}
    />
    <small className="text-muted small">
      Result:
      <br />
      {' '}
      {config.result ? JSON.stringify(config.result) : null}
    </small>
  </div>
);

const Card = (props) => {
  const {
    item = {}, customClasses = '', hideButtons, onAdd, onDelete, onChange,
  } = props;

  if (!item || !Object.keys(item).length) {
    console.warn('Cannot render empty item ', item);
    return null;
  }

  return (
    <div className={`card element-card shadow text-center m-2 ${customClasses}`}>
      <div className="card-body">

        {typeof item.index !== 'undefined' ? renderIndex(item.index) : null}
        {item.name ? renderTitle(item.name) : null}
        {item.materialIcon ? renderIcon(item.materialIcon) : null}
        {item.description ? renderDescription(item.description) : null}

        {onAdd && !hideButtons && !onDelete ? renderAddButton(onAdd) : null}
        {onDelete && !hideButtons && !onAdd ? renderDeleteButton(onDelete) : null}

      </div>
      {Object.keys(item.config || {}).length && onChange
        ? renderConfig(item.config, onChange) : null}
    </div>
  );
};

Card.defaultProps = {
  item: {},
  onAdd: null,
  onDelete: null,
  onChange: null,
  hideButtons: false,
  customClasses: '',
};

Card.propTypes = {
  item: shape(WorkflowElement.prototype),
  customClasses: string,
  hideButtons: bool,
  onAdd: func,
  onDelete: func,
  onChange: func,
};

export default memo(Card);
