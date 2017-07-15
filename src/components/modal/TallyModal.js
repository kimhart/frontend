import React, { Component } from 'react';
import Modal from 'react-modal';

class TallyModal extends Component {

  handleOpen() {
    let $el = $('.js-scroll-hook');
    if ($el && !$el.hasClass('no-scroll')) {
      $el.addClass('no-scroll');
    }
  }

  handleClose() {
    let $el = $('.js-scroll-hook');
    if ($el && $el.hasClass('no-scroll')) {
      $el.removeClass('no-scroll');
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let { isOpen: wasOpen } = this.props;
    let { isOpen } = nextProps;
    if (wasOpen && !isOpen) this.handleClose();
  }

  render() {
    let { contentLabel, className, style, isOpen, children } = this.props;
    return (
      <Modal
        contentLabel={contentLabel}
        className={className}
        isOpen={isOpen}
        style={style || {}}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={() => this.handleOpen()}
        onRequestClose={() => this.handleClose()}
      >
        { children }
      </Modal>
    );
  }

}

export default TallyModal;
