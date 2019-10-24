import React from 'react';

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
  const buttonProps = getButtonProps(props);

  return (
    <button {...buttonProps} className={`btn btn-outline-light btn-circle ${props.shadow ? 'shadow ' : ' '}${props.class || ''}`}>
      {props.loading ? renderLoader() : renderIcon(props.icon)}
    </button>
  );
};

export default React.memo(Button);
