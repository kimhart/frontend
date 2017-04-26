import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { emitter, actions } from '../../utils/Emitter';
import TallyLogo from '.././icons/Icons';

class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillUnmount() {
    emitter.unsubscribe(actions.APP_LOADING, this.handleLoading);
  }

  componentWillMount() {
    emitter.subscribe(actions.APP_LOADING, this.handleLoading);
  }

  handleLoading = ({ loading }) => {
    this.setState({ loading });
  }

  render() {
    let { loading } = this.state;
    return (
      <div className={`loading-wrap${loading ? ' active' : ''}`}>
        <LoadingSpinner />
      </div>
    );
  }

}

export default Loading;
