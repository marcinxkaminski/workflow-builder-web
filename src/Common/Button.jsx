import React, { memo } from 'react';

export const DEFAULT_ICON = 'help';
export const LOADING_TEXT = 'Loading...';
export const DEFAULT_CLASSES = 'btn btn-outline-light btn-circle';

const getButtonProps = ({ onClick, disabled }) => {
  const buttonProps = {}

  if (onClick) buttonProps.onClick = onClick;
  if (disabled) buttonProps.disabled = disabled;

  return buttonProps;
};

const renderLoader = () => (
  <div className="loader spinner-border" role="status">
    <span className="sr-only">{LOADING_TEXT}</span>
  </div>
);

const renderIcon = (icon) => (
  <i className="material-icons">{icon || DEFAULT_ICON}</i>
);

const Button = props => {
  const btnProps = getButtonProps(props);
  const { shadow, customClasses, loading, icon } = props;

  return (
    <button
      {...btnProps}
      className={`${DEFAULT_CLASSES}${shadow ? ' shadow' : ''}${customClasses ? ' ' + customClasses : ''}`}>
      {loading ? renderLoader() : renderIcon(icon)}
    </button>
  );
};

export default memo(Button);
