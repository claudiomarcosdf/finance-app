import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import ImageUpload from '../../components/ImageUploader/ImageUpload';
import { addCustomerPhoto } from '../../states/Customer/customerActions';

export default function CustomerProfilePhoto(props) {
  const { onClose } = props;

  const [photo, setPhoto] = useState({});
  const { _id } = useSelector((state) => state.customerState.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(photo)) {
      let formData = new FormData();
      formData.append('file', photo[0]);

      dispatch(addCustomerPhoto(_id, 'photo', formData));
    }
  }, [photo, _id, dispatch]);

  const handleModalClose = () => {
    onClose(null);
  };

  const onDrop = (picture) => {
    setPhoto(picture);
  };

  return (
    <div>
      <ImageUpload
        {...props}
        onChange={onDrop}
        title="Foto do perfil"
        labelButton="Selecione sua foto"
        imageSize={2097152}
      />
      <Button color="secondary" onClick={handleModalClose}>
        Sair
      </Button>
    </div>
  );
}
