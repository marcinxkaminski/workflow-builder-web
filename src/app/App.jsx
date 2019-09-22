import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DropzoneContainer from '../Dropzone/DropzoneContainer';
import SelectorContainer from '../Selector/SelectorContainer';

const App = () => (
  <div className="app-bg">
    <Container>
      <Row className="h-75">
        <DropzoneContainer />
      </Row>
      <Row className="h-25 ">
        <SelectorContainer />
      </Row>
    </Container>
  </div>
);

export default React.memo(App);
