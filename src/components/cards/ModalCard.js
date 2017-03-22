import React from 'react';

class ModalCard extends React.Component {

  render() {
    return (
      <div className={`modal-card-wrap${this.props.active ? ' active' : ''}`} onClick={() => this.props.close()}>
        <div className="modal-card">
          { this.props.children }
        </div>
      </div>
    );
  }

}

export default ModalCard;
