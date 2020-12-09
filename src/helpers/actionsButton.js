const controlActions = (action, status) => {
  if (status === 'Aguardando comprovante') {
    if (action === 'edit' || action === 'cancel' || action === 'voucher') {
      return true;
    }
  } else if (status === 'Depósito a confirmar') {
    if (action === 'voucher') {
      return true;
    }
  } else if (status === 'Aprovado e aplicado') {
    if (action === 'rescue') {
      return true;
    }
  } else return false;
};

export default controlActions;
