import React from 'react';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Cancel from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import Tooltip from '@material-ui/core/Tooltip';

import enableButton from '../../helpers/actionsButton';

const disableButton = {
  pointerEvents: 'none',
  cursor: 'default',
};

const enabledButton = {
  pointerEvents: 'visible',
  cursor: 'pointer',
};

export default function ActionButton({ button, status, onClick }) {
  const editButton = (status) => {
    return (
      <Tooltip title="Editar investimento" placement="top" arrow>
        <a
          href="#user"
          // className={!enableButton('edit', status) ? classes.disabled : ''}
          style={!enableButton('edit', status) ? disableButton : enabledButton}
          onClick={handleClick}
          // onClick={(e) => handleEditInvestment(investment)}
        >
          <EditIcon
            style={enableButton('edit', status) ? activeStyle : inactiveStyle}
          />
        </a>
      </Tooltip>
    );
  };

  const cancelButton = (status) => {
    return (
      <Tooltip title="Cancelar investimento" placement="top" arrow>
        <a
          href="#user"
          style={
            !enableButton('cancel', status) ? disableButton : enabledButton
          }
          onClick={handleClick}
        >
          <Cancel
            style={enableButton('cancel', status) ? activeStyle : inactiveStyle}
          />
        </a>
      </Tooltip>
    );
  };

  const voucherButton = (status) => {
    return (
      <Tooltip title="Enviar comprovante de depósito" placement="top" arrow>
        <a
          href="#user"
          style={
            !enableButton('voucher', status) ? disableButton : enabledButton
          }
          onClick={handleClick}
        >
          <ImageIcon
            style={
              enableButton('voucher', status) ? activeStyle : inactiveStyle
            }
          />
        </a>
      </Tooltip>
    );
  };

  const handleClick = () => {
    onClick(null);
  };

  return (
    <>
      {button === 'edit'
        ? editButton(status)
        : button === 'cancel'
        ? cancelButton(status)
        : voucherButton(status)}
    </>
  );
}

const activeStyle = {
  color: '#8e24aa',
};

const inactiveStyle = {
  color: '#adb5bd',
};
