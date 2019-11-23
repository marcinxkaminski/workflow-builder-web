import React, { useEffect, memo } from 'react';
import {
  arrayOf, func, shape, string,
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAvailableWorkflowElements, addWorkflowElement } from './selectorActions';
import SelectorCarousel from './SelectorCarousel';
import { getWindowWidth } from '../utils/windowHelper';

export const getVisibleItemsCount = () => (getWindowWidth() <= 768 ? 1 : 3);

export const SelectorContainer = (props) => {
  /* istanbul ignore next */
  const {
    availableWorkflowElements,
    addWorkflowElement: dispatchAdd,
    getAvailableWorkflowElements: dispatchGet,
  } = props;

  useEffect(() => {
    dispatchGet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="selector" className="container-fluid w-100 shadow p-4 mb-2">
      <div className="row">
        <SelectorCarousel
          itemsVisibleCount={getVisibleItemsCount()}
          items={availableWorkflowElements}
          onAdd={dispatchAdd}
          infinite
        />
      </div>
    </div>
  );
};

SelectorContainer.propTypes = {
  availableWorkflowElements: arrayOf(shape({
    id: string,
    name: string,
    materialIcon: string,
    description: string,
  })).isRequired,
  addWorkflowElement: func.isRequired,
  getAvailableWorkflowElements: func.isRequired,
};

const mapStateToProps = ({ selectorState }) => selectorState;
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAvailableWorkflowElements,
  addWorkflowElement,
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(SelectorContainer));
