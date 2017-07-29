import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { IconSettings } from '../icons/Icons';
import { UserUtils } from '../../utils/Utils';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      editingAddress: false,
      changingPassword: false
    }
    props.relay.setVariables({ user_id: UserUtils.getUserId() || null });
  }

  editAddress = () => {
    let { editingAddress } = this.state;
    this.setState({
      editingAddress: !editingAddress
    })
    // on save, revert back to 'not editing'
  }

  changePassword = () => {
    let { changingPassword } = this.state;
    this.setState({
      changingPassword: !changingPassword
    })
    // on save, revert back to 'not changing'
  }

  render() {
    let { editingAddress, changingPassword } = this.state;
    let { user } = this.props.data;
    console.log({ user });
    return (
      <div className="profile-wrap">
        <div className="blue-header">
          <h2 className="page-title">Settings</h2>
        </div>
        <div className="profile-info">
          <div className="profile-section">
            <h3 className="profile-label">{ editingAddress ? 'Edit Address' : 'Your Address' }</h3>
            { editingAddress &&
            <div className="profile-section-content">
              <input className="profile-input input--outline" placeholder="New Street Address"/>
              <input className="profile-input input--outline" placeholder="New ZIP Code"/>
              <div className="profile-section-controls">
                <button className="button--large button--outline button--gray" onClick={() => this.editAddress()}>Cancel</button>
                <button className="button--large" onClick={() => console.log('save address to DB')}>Save</button>
              </div>
            </div>
            }
            { !editingAddress &&
            <div className="profile-section-content">
              <span className="profile-current-value">123 Main St, New York, NY</span>
              <button className="profile-info-update-button button--medium button--outline button--gray" onClick={() => this.editAddress()}>Update Address</button>
            </div>
            }
          </div>
          <div className="profile-section">
            <h3 className="profile-label">{ changingPassword ? 'Change Your Password' : 'Password' }</h3>
            { changingPassword &&
            <div className="profile-section-content">
              <input className="profile-input input--outline" placeholder="Old Password"/>
              <input className="profile-input input--outline" placeholder="New Password"/>
              <input className="profile-input input--outline" placeholder="Confirm Password"/>
              <div className="profile-section-controls">
                <button className="button--large button--outline button--gray" onClick={() => this.changePassword()}>Cancel</button>
                <button className="button--large" onClick={() => console.log('save PW to DB')}>Save</button>
              </div>
            </div>
            }
            { !changingPassword &&
            <div className="profile-section-content">
              <span className="profile-current-value pw">********************</span>
              <button className="profile-info-update-button button--medium button--outline button--gray" onClick={() => this.changePassword()}>Change Password</button>
            </div>
            }
          </div>
        </div>
        <div className="profile-button-wrap">
          <button className="button--large button--red logout-button" onClick={() => this.props.logOut()}>Logout</button>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(Settings, {
  initialVariables: {
    user_id: null
  },
  fragments: {
    data: () => Relay.QL`
      fragment on Data {
        id
        user(user_id: $user_id) {
          city
          district
          first_name
          last_name
          state_long
          state_short
          street
          zip_code
          user_id
          error
        }
      }
    `
  }
});
