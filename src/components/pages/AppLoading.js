import React from 'react';
import TallyLogo from '../icons/TallyLogo';

class AppLoading extends React.Component {

    render() {
      return (
        <div>
          <div className="app-loading-wrap">
            <div className="app-loading-message">
              <h1 className="welcome-to-tally">Welcome to Tally</h1>
              <TallyLogo />
            </div>
          </div>
        </div>
      );
    }
}

export default AppLoading;
