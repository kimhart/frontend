import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { IconSettings } from '../icons/Icons';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      editingAddress: false,
      changingPassword: false
    }
  }

  editAddress = () => {
    console.log('editing address');
    let { editingAddress } = this.state;
    this.setState({
      editingAddress: !editingAddress
    })
    // on save, revert back to 'not editing'
  }

  changePassword = () => {
    console.log('changing password');
    let { changingPassword } = this.state;
    this.setState({
      changingPassword: !changingPassword
    })
    // on save, revert back to 'not changing'
  }

  render() {
    let { editingAddress, changingPassword } = this.state;
    return (
      <div className="settings-wrap">
        <div className="settings-header">
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
            <span className="current">123 Main St, New York, NY</span>
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
            <p className="logout clickable">Logout</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
