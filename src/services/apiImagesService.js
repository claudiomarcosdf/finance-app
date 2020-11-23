import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function saveImage(idCustomer, namePath, dataForm) {
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

export { saveImage };
