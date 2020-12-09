import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ReactModal({ open, size, children }) {
  const screenSize = `${size}px`;

  const styles = {
    content: {
      width: screenSize,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px',
    },
  };

  return (
    <div>
      <Modal style={styles} isOpen={open}>
        {children}
      </Modal>
    </div>
  );
}
