import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

//Apenas para buscar algum cliente enquanto desenvolvo
async function getCustomer(email) {
  const response = await axios.get(`${BASE_URL}/clientes/email?email=${email}`);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

async function updateCustomer(id, customer) {
  const response = await axios.put(`${BASE_URL}/clientes/${id}`, customer);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

export { getCustomer, updateCustomer };
