import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

import { styles } from './CustomerProfilePhotoStyle';
import { saveImage } from '../../services/apiImagesService';

export default function CustomerProfilePhoto(props) {
  const { onClose } = props;

  const [photo, setPhoto] = useState({});
  const { _id } = useSelector((state) => state.customerState.customer);

  useEffect(() => {
    if (!_.isEmpty(photo)) {
      let formData = new FormData();
      formData.append('file', photo[0]);
      saveImage(_id, 'photo', formData)
        .then((response) => {
          toastr.success('Sucesso', 'Atualização realizada com sucesso.');
        })
        .catch((error) => {
          toastr.error('Erro', error);
        });
    }
  }, [photo]);

  const handleModalClose = () => {
    onClose(null);
  };

  const onDrop = (picture) => {
    setPhoto(picture);
  };

  const classes = styles();
  return (
    <div>
      <Typography
        variant="h6"
        style={{
          marginTop: '2px',
          marginBottom: '2px',
          textAlign: 'center',
        }}
      >
        Foto do perfil
      </Typography>
      <div className={classes.boxColumn}>
        <div className={classes.box}>
          <ImageUploader
            {...props}
            withIcon={true}
            withPreview={true}
            label="Tamanho máximo do arquivo: 2mb | tipos aceitos: JPG, PNG, GIF"
            labelStyles={{ textAlign: 'center' }}
            buttonText="Selecione sua foto"
            fileSizeError="Tamanho do arquivo maior que o permitido"
            fileTypeError="é um tipo não suportado"
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={2097152}
            singleImage={true}
          />
        </div>
      </div>
      <Button color="secondary" onClick={handleModalClose}>
        Sair
      </Button>
    </div>
  );
}
