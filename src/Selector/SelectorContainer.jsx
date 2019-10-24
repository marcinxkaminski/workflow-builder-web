import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAvailableWorkflowElements, addWorkflowElement } from './selectorActions';
import SelectorCarousel from './SelectorCarousel';

const SelectorContainer = (props) => {
  useEffect(() => {
    props.getAvailableWorkflowElements();
  }, []);

  return (
    <div id="selector" className="container-fluid w-100 shadow p-4 mb-2" >
      <div className="row">
        <SelectorCarousel
          items={props.availableWorkflowElements}
          onAdd={props.addWorkflowElement}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectorState }) => selectorState;
const mapDispatchToProps = dispatch => bindActionCreators({
  getAvailableWorkflowElements,
  addWorkflowElement
}, dispatch);

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(SelectorContainer));
