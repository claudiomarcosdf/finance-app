import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Typography from '@material-ui/core/Typography';

import { toastr } from 'react-redux-toastr';

import _ from 'lodash';
import { styles } from './documentsStyle';
import { saveDocument } from '../../../services/apiImagesService';
import { currentCustomer } from '../../../states/Customer/customerActions';

export default function Documents(props) {
  const classes = styles();
  const customer = useSelector((state) => state.customerState.customer);
  const { _id, personal_data } = customer;
  const dispatch = useDispatch();

  const { documents } = personal_data;
  const [imageCpf, setImageCpf] = useState(!!documents.cpf_name);
  const [imageRg, setImageRg] = useState(!!documents.rg_name);
  const [imageResidence, setImageResidence] = useState(
    !!documents.residence_name
  );

  const [cpfPicture, setCpfPicture] = useState({});
  const [rgPicture, setRgPicture] = useState({});
  const [residencePicture, setResidencePicture] = useState({});

  useEffect(() => {
    if (!_.isEmpty(cpfPicture)) {
      (async () => {
        await saveImage('cpf', cpfPicture);
        setImageCpf(true);
      })();
    }
  }, [cpfPicture]);

  useEffect(() => {
    if (!_.isEmpty(rgPicture)) {
      (async () => {
        await saveImage('rg', rgPicture);
        setImageRg(true);
      })();
    }
  }, [rgPicture]);

  useEffect(() => {
    if (!_.isEmpty(residencePicture)) {
      (async () => {
        await saveImage('residence', residencePicture);
        setImageResidence(true);
      })();
    }
  }, [residencePicture]);

  const saveImage = (type, picture) => {
    let formData = new FormData();
    formData.append('file', picture[0]);
    saveDocument(_id, 'document', type, formData)
      .then((response) => {
        toastr.success('Sucesso', 'Documento salvo com sucesso.');
        updateCurrentCustomer(response.data);
      })
      .catch((error) => {
        toastr.error('Erro', error);
      });
  };

  const updateCurrentCustomer = (cust) => {
    const personalData = customer.personal_data;
    const newDocuments = cust.personal_data.documents;

    const alteredPersonalData = {
      ...personalData,
      documents: newDocuments,
    };

    const alteredCustomer = {
      ...customer,
      personal_data: alteredPersonalData,
    };

    dispatch(currentCustomer(alteredCustomer));
  };

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

  const getLegend = (document) => {
    if (document) {
      return <span className={classes.legendOk}>Documento já enviado.</span>;
    } else {
      return (
        <span className={classes.legendNotOk}>Documento não enviado.</span>
      );
    }
  };

  return (
    <div>
      {/* {cpfPicture ? console.log(cpfPicture[0]) : cpfPicture} */}
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginTop: '0px', marginBottom: '2px' }}
      >
        Upload de documentos
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
            imgExtension={['.jpg', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
          {getLegend(imageCpf)}
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
            imgExtension={['.jpg', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
          {getLegend(imageRg)}
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
            imgExtension={['.jpg', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
          {getLegend(imageResidence)}
        </div>
      </div>
    </div>
  );
}
