import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function savePhoto(idCustomer, namePath, dataForm) {
  // BASE_URL/clientes/photo?id=_id

  const response = await axios.post(
    `${BASE_URL}/clientes/${namePath}?id=${idCustomer}`,
    dataForm,
    {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${dataForm._boundary}`,
      },
    }
  );

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

async function saveDocument(idCustomer, namePath, type, dataForm) {
  // BASE_URL/clientes/document?type=cpf&id=xxx

  const response = await axios.post(
    `${BASE_URL}/clientes/${namePath}?type=${type}&id=${idCustomer}`,
    dataForm,
    {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${dataForm._boundary}`,
      },
    }
  );

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

async function saveVoucher(customerId, investmentId, namePath, dataForm) {
  /* [POST]   /clientes/voucher?id=xxx&investmentId=yyy   */

  const response = await axios.post(
    `${BASE_URL}/clientes/${namePath}?id=${customerId}&investmentId=${investmentId}`,
    dataForm,
    {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${dataForm._boundary}`,
      },
    }
  );

  if (response.status !== 200) {
    throw Error(response.data.errors);
  }

  return response;
}

export { savePhoto, saveDocument, saveVoucher };
