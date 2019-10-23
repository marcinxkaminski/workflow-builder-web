import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SelectorArrow from './SelectorArrow';
import { getAvailableWorkflowElements } from './selectorActions';
import Carousel from '@brainhubeu/react-carousel';
import ArrowDirections from '../data/ArrowDirections';

const SLIDES_PER_PAGE = 3;

const SelectorContainer = (props) => {
  useEffect(() => {
    props.getAvailableWorkflowElements();
  }, []);

  return (
    <div id="selector" className="w-100 shadow p-2" >
      <Carousel
        arrowLeft={<SelectorArrow direction={ArrowDirections.LEFT} />}
        arrowRight={<SelectorArrow direction={ArrowDirections.RIGHT} />}
        slidesPerPage={SLIDES_PER_PAGE}
        infinite
        centered>

      </Carousel>
    </div>
  );
};

const mapStateToProps = ({ selectorState }) => selectorState;
const mapDispatchToProps = dispatch => bindActionCreators({ getAvailableWorkflowElements }, dispatch);

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(SelectorContainer));
