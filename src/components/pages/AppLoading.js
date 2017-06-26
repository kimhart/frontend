import React from 'react';
import TallyLogo from '../icons/TallyLogo';
import { emitter, actions } from '../../utils/Emitter';

class AppLoading extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillUnmount() {
    emitter.unsubscribe(actions.INIT_APP_LOADING, this.handleLoading);
  }

  componentWillMount() {
    emitter.subscribe(actions.INIT_APP_LOADING, this.handleLoading);
  }

  handleLoading = ({ loading }) => {
    this.setState({ loading });
  }

  render() {
    return this.state.loading ? (
      <div style={{ height: '100vh' }}>
        <div className="app-loading-wrap">
          <div className="app-loading-message">
            <h1 className="welcome-to-tally">Welcome to Tally</h1>
            <TallyLogo />
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default AppLoading;
