import React, { memo } from 'react';

const getButtonProps = (props) => {
  const buttonProps = {}

  if (props.onClick) {
    buttonProps.onClick = props.onClick;
  }

  if (props.disabled) {
    buttonProps.disabled = props.disabled;
  }

  return buttonProps;
}

const renderLoader = () => (
  <div className="loader spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const renderIcon = (icon) => (
  <i className="material-icons">{icon}</i>
);

const Button = props => {
  const btnProps = getButtonProps(props);
  const { shadow, customClasses, loading, icon } = props;

  return (
    <button {...btnProps} className={`btn btn-outline-light btn-circle ${shadow ? 'shadow ' : ' '}${customClasses || ''}`}>
      {loading ? renderLoader() : renderIcon(icon)}
    </button>
  );
};

export default memo(Button);
