import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Typography from '@material-ui/core/Typography';

import { toastr } from 'react-redux-toastr';
import axios from 'axios';

import _ from 'lodash';
import { styles } from './documentsStyle';

export default function Documents(props) {
  // const [cpfPicture, setCpfPicture] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cpfPicture, setCpfPicture] = useState({});
  const [rgPicture, setRgPicture] = useState({});
  const [residencePicture, setResidencePicture] = useState({});

  const { _id } = useSelector((state) => state.customerState.customer);

  // useEffect(() => {
  //   if (!_.isEmpty(cpfPicture)) {
  //     let formData = new FormData();
  //     formData.append('file', cpfPicture[0]);
  //     axios
  //       .post(`${BASE_URL}/clientes/photo?id=${_id}`, formData, {
  //         headers: {
  //           accept: 'application/json',
  //           'Accept-Language': 'en-US,en;q=0.8',
  //           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  //         },
  //       })
  //       .then((response) => {
  //         toastr.success('Sucesso', 'Atualização realizada com sucesso.');
  //       })
  //       .catch((error) => {
  //         toastr.error('Erro', error);
  //       });
  //   }
  // }, [cpfPicture]);

  const onDropCpf = (picture) => {
    // setCpfPicture([...cpfPicture, picture]);
    setCpfPicture(picture);
  };

  const onDropRg = (picture) => {
    setRgPicture(picture);
  };

  const onDropResidence = (picture) => {
    setResidencePicture(picture);
  };

  const classes = styles();
  return (
    <div>
      {cpfPicture ? console.log(cpfPicture[0]) : cpfPicture}
      {/* {console.log(rgPicture[0].file)} */}
      {/* {console.log(residencePicture[0].file)} */}
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginTop: '0px', marginBottom: '2px' }}
      >
        Upload de documentos:
      </Typography>
      <div className={classes.boxColumn}>
        <div className={classes.box}>
          <ImageUploader
            {...props}
            name="cpf"
            withIcon={true}
            withPreview={true}
            label="Cópia do 'CPF' | tamanho máximo do arquivo: 5mb"
            labelStyles={{ textAlign: 'center' }}
            buttonText="Selecione a imagem"
            fileSizeError="Tamanho do arquivo maior que o permitido"
            fileTypeError="é um tipo não suportado"
            onChange={onDropCpf}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </div>
        <div className={classes.box}>
          <ImageUploader
            {...props}
            name="rg"
            withIcon={true}
            withPreview={true}
            label="Cópia da identidade | tamanho máximo do arquivo: 5mb"
            labelStyles={{ textAlign: 'center' }}
            buttonText="Selecione a imagem"
            fileSizeError="Tamanho do arquivo maior que o permitido"
            fileTypeError="é um tipo não suportado"
            onChange={onDropRg}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </div>
        <div className={classes.box}>
          <ImageUploader
            {...props}
            name="residence"
            withIcon={true}
            withPreview={true}
            label="Cópia do comprovante de residência tamanho máximo do arquivo: 5mb"
            labelStyles={{ textAlign: 'center' }}
            buttonText="Selecione a imagem"
            fileSizeError="Tamanho do arquivo maior que o permitido"
            fileTypeError="é um tipo não suportado"
            onChange={onDropResidence}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </div>
      </div>
    </div>
  );
}
