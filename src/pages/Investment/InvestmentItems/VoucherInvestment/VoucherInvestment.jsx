import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import ImageUpload from '../../../../components/ImageUploader/ImageUpload';
import { addVoucher } from '../../../../states/Investment/investmentActions';

export default function VoucherInvestment(props) {
  const { onClose } = props;

  const [voucher, setVoucher] = useState({});
  const { _id } = useSelector((state) => state.customerState.customer);
  const investment = useSelector((state) => state.investmentState.investment);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(voucher)) {
      let formData = new FormData();
      formData.append('file', voucher[0]);

      dispatch(addVoucher(_id, investment._id, 'voucher', formData));
    }
  }, [voucher, _id, dispatch]);

  const handleModalClose = () => {
    onClose(null);
  };

  const onDrop = (picture) => {
    setVoucher(picture);
  };

  return (
    <div>
      <ImageUpload
        {...props}
        onChange={onDrop}
        title="Comprovante de pagamento"
        labelButton="Selecione o comprovante"
        imageSize={6291456}
      />
      <Button color="secondary" onClick={handleModalClose}>
        Sair
      </Button>
    </div>
  );
}
