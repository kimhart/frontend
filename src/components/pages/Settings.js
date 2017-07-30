import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { IconSettings } from '../icons/Icons';
import { UserUtils } from '../../utils/Utils';
import ChangeAddressMutation from '../mutations/ChangeAddressMutation';
import ChangePasswordMutation from '../mutations/ChangePasswordMutation';
import { isLoading } from '../../utils/Utils';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      editingAddress: false,
      changingPassword: false,
      address_error: null,
      password_error: null
    }
    props.relay.setVariables({ user_id: UserUtils.getUserId() || null });
  }

  editAddress = () => {
    let { editingAddress } = this.state;
    this.setState({
      editingAddress: !editingAddress,
      address_error: null
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

  getUserName(user) {
    return user ? `${user.first_name} ${user.last_name}` : '';
  }

  getAddress(user) {
    return user ? [
      <span key="profile-district" className="profile-district">{ `District ${user.district}` }</span>,
      <span key="profile-address" className="">{ `${user.street}, ${user.city}, ${user.state_short} ${user.zip_code}` }</span>
    ] : null;
  }

  updateAddress = () => {
    let {
      new_zip_code: { value: zip_code },
      new_street: { value: street },
      props: {
        data: { user }
      }
    } = this;
    isLoading(true);
    this.props.relay.commitUpdate(new ChangeAddressMutation({ user: user, user_id: user.user_id, street, zip_code }), {
      onFailure: (error) => {
        isLoading(false);
        console.error({ file: 'ChangeAddressMutation', error });
      },
      onSuccess: ({ ChangeAddress: { user } }) => {
        console.log({ user });
        if (user.error) {
          isLoading(false);
          this.setState({ address_error: user.error });
        }
        else {
          this.props.relay.forceFetch({ user_id: UserUtils.getUserId() || null }, ({ done, error, aborted }) => {
            if (done || error || aborted) {
              isLoading(false);
            }
          });
          this.setState({ editingAddress: false, address_error: null });
        }
      }
    })
  }

  updatePassword = () => {
    let {
      new_password: { value: password },
      confirm_new_password: { value: confirm_new_password },
      old_password: { value: old_password },
      props: {
        data: { user }
      }
    } = this;
    console.log({ password, confirm_new_password, old_password });
    this.props.relay.commitUpdate(new ChangePasswordMutation({ user: user, user_id: user.user_id, password }), {
      onFailure: (error) => {
        console.error({ file: 'ChangePasswordMutation', error });
      },
      onSuccess: ({ ChangePassword: { user } }) => {
        console.log({ user });
        if (user.error) {
          this.setState({ error: user.error });
        }
        else {
          this.props.relay.forceFetch({ user_id: UserUtils.getUserId() || null });
          this.setState({ editingPassword: false });
        }
      }
    })
  }

  render() {
    let { editingAddress, changingPassword, address_error, password_error } = this.state;
    let { user } = this.props.data;
    return (
      <div className="profile-wrap">
        <div className="blue-header">
          <h2 className="page-title">Settings</h2>
        </div>
        <div className="profile-info">
          <div className="profile-section">
            <h3 className="profile-label">Name</h3>
            <div className="profile-section-content">
              <span className="profile-current-value">{ this.getUserName(user) }</span>
            </div>
          </div>
          <div className="profile-section">
            <h3 className="profile-label">{ editingAddress ? 'Edit Address' : 'Address' }</h3>
            { editingAddress &&
              <div className="profile-section-content">
                { address_error &&
                  <div className="profile-address-error">
                    { address_error }
                  </div>
                }
                <div className="profile-input-wrap input-label-wrap">
                  <input ref={c => this.new_street = c} id="new-street-input" className="profile-input input--outline"/>
                  <label className="label-input-placeholder" htmlFor="new-street-input">New Street Address</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input ref={c => this.new_zip_code = c} id="new-zip-input" className="profile-input input--outline"/>
                  <label className="label-input-placeholder" htmlFor="new-zip-input">New ZIP Code</label>
                </div>
                <div className="profile-section-controls">
                  <button className="button--large button--outline button--gray" onClick={() => this.editAddress()}>Cancel</button>
                  <button className="button--large" onClick={() => this.updateAddress()}>Save</button>
                </div>
              </div>
            }
            { !editingAddress &&
              <div className="profile-section-content">
                <div className="profile-current-value">
                  { this.getAddress(user) }
                </div>
                <button className="profile-info-update-button button--medium button--outline button--gray" onClick={() => this.editAddress()}>Update Address</button>
              </div>
            }
          </div>
          <div className="profile-section">
            <h3 className="profile-label">{ changingPassword ? 'Change Your Password' : 'Password' }</h3>
            { changingPassword &&
              <div className="profile-section-content">
                <div className="profile-input-wrap input-label-wrap">
                  <input ref={c => this.old_password = c} id="old-password-input" className="profile-input input--outline"/>
                  <label className="label-input-placeholder" htmlFor="old-password-input">Old Password</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input ref={c => this.new_password = c} id="new-password-input" className="profile-input input--outline"/>
                  <label className="label-input-placeholder" htmlFor="new-password-input">New Password</label>
                </div>
                <div className="profile-input-wrap input-label-wrap">
                  <input ref={c => this.confirm_new_password = c} id="new-password-confirm" className="profile-input input--outline"/>
                  <label className="label-input-placeholder" htmlFor="new-password-confirm">Confirm Password</label>
                </div>
                <div className="profile-section-controls">
                  <button className="button--large button--outline button--gray" onClick={() => this.changePassword()}>Cancel</button>
                  <button className="button--large" onClick={() => this.updatePassword()}>Save</button>
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
          ${ChangeAddressMutation.getFragment('user')}
          ${ChangePasswordMutation.getFragment('user')}
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
