import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAvailableWorkflowElements, addWorkflowElement } from './selectorActions';
import SelectorCarousel from './SelectorCarousel';
import { getWindowWidth } from '../utils/windowHelper';

const VISIBLE_ITEMS_COUNT = getWindowWidth() <= 768 ? 1 : 3;

const SelectorContainer = (props) => {
  const { availableWorkflowElements, addWorkflowElement, getAvailableWorkflowElements } = props;

  useEffect(() => {
    getAvailableWorkflowElements();
  }, []);

  const renderCarousel = () => {
    return !availableWorkflowElements.length ? null : (
      <SelectorCarousel
        itemsVisibleCount={VISIBLE_ITEMS_COUNT}
        items={availableWorkflowElements}
        onAdd={addWorkflowElement}
        infinite
      />
    );
  };

  return (
    <div id="selector" className="container-fluid w-100 shadow p-4 mb-2" >
      <div className="row">
        {renderCarousel()}
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectorState }) => selectorState;
const mapDispatchToProps = dispatch => bindActionCreators({
  getAvailableWorkflowElements,
  addWorkflowElement
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(SelectorContainer));
