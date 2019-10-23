import React from 'react';

const SelectorArrow = props => (
  <div className="btn btn-light btn-circle cursor-pointer shadow-lg">
    <i className="material-icons">{props.direction}</i>
  </div>
);

export default React.memo(SelectorArrow);
