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
      <div className="settings-wrap">
        <div className="blue-header">
          <h2 className="page-title">Settings</h2>
        </div>
        <div className="update-settings">
          <p className="settings-label">{ editingAddress ? 'Edit Address' : 'Your Address' }</p>
          { editingAddress &&
            <div className="row">
              <input className="update-settings-input" placeholder="New Street Address"/>
              <input className="update-settings-input" placeholder="New ZIP Code"/>
              <p className="update-settings-input save" onClick={() => console.log('save address to DB')}>Save</p>
              <p className="update-settings-input cancel" onClick={() => this.editAddress()}>Cancel</p>
            </div>
          }
          { !editingAddress &&
            <div className="row">
              <span className="current">{ user ? `${user.street}, ${user.city}, ${user.state_short} ${user.zip_code}` : '123 Main St, New York, NY'}</span>
              <span className="update" onClick={() => this.editAddress()}>Update Address</span>
            </div>
          }
          <p className="settings-label">{ changingPassword ? 'Change Your Password' : 'Password' }</p>
          { changingPassword &&
            <div className="row">
              <input className="update-settings-input" placeholder="Old Password"/>
              <input className="update-settings-input" placeholder="New Password"/>
              <input className="update-settings-input" placeholder="Confirm Password"/>
              <p className="update-settings-input save" onClick={() => console.log('save PW to DB')}>Save</p>
              <p className="update-settings-input cancel" onClick={() => this.changePassword()}>Cancel</p>
            </div>
          }
          { !changingPassword &&
            <div className="row">
              <span className="current pw">********************</span>
              <span className="update" onClick={() => this.changePassword()}>Change Password</span>
            </div>
          }
          <div className="row">
            <p className="logout clickable" onClick={() => this.props.logOut()}>Logout</p>
          </div>
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
