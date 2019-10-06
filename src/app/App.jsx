import React from 'react';
import { connect } from 'react-redux';
import DropzoneContainer from '../Dropzone/DropzoneContainer';
import SelectorContainer from '../Selector/SelectorContainer';
import { initApp } from './appActions';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <div className="container-fluid full-screen">
        <div className="full-screen row justify-content-center">
          <DropzoneContainer />
          <SelectorContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ appState }) => ({ appState });

const mapDispatchToProps = { initApp };

export default connect(mapStateToProps, mapDispatchToProps)(App);
