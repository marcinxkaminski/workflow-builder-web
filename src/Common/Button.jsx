import React, { memo } from 'react';
import { bool, string } from 'prop-types';

export const DEFAULT_ICON = 'help';
export const DEFAULT_SHADOW = true;
export const LOADING_TEXT = 'Loading...';
export const DEFAULT_CLASSES = 'btn btn-outline-light btn-circle';

const getButtonProps = ({ onClick, disabled }) => {
  const buttonProps = {};

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

const Button = (props) => {
  const btnProps = getButtonProps(props);
  const {
    shadow,
    customClasses,
    loading,
    icon,
  } = props;

  return (
    <button
      type="button"
      {...btnProps} // eslint-disable-line react/jsx-props-no-spreading
      className={`${DEFAULT_CLASSES}${shadow ? ' shadow' : ''}${customClasses ? ` ${customClasses}` : ''}`}
    >
      {loading ? renderLoader() : renderIcon(icon)}
    </button>
  );
};

Button.defaultProps = {
  shadow: DEFAULT_ICON,
  customClasses: null,
  loading: null,
  icon: DEFAULT_ICON,
};

Button.propTypes = {
  shadow: bool,
  customClasses: string,
  loading: bool,
  icon: string,
};

export default memo(Button);
