import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

async function insertInvestment(customerId, investment) {
  const response = await axios.post(
    `${BASE_URL}/clientes/investment?id=${customerId}`,
    investment
  );

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response; //Return All Fields
}

async function cancelInvestment(customerId, investmentId) {
  /* [PUT]   /clientes/cancel-investment?id=xxx&idInvestment=yyy   */
  const response = await axios.put(
    `${BASE_URL}/clientes/cancel-investment?id=${customerId}&investmentId=${investmentId}`
  );

  if (response.status !== 200) {
    throw Error(response.data.errors);
  }

  return response;
}

async function updateInvestment(customerId, investment) {
  const response = await axios.put(
    `${BASE_URL}/clientes/investment?id=${customerId}&investmentId=${investment._id}`,
    investment
  );

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response; //Return All Fields
}

async function rescueInvestment(customerId, investmentId) {
  /* [PUT]   /clientes/rescue-investment?id=xxx&idInvestment=yyy   */
  const response = await axios.put(
    `${BASE_URL}/clientes/rescue-investment?id=${customerId}&investmentId=${investmentId}`
  );

  if (response.status !== 200) {
    throw Error(response.data.errors);
  }

  return response;
}

export {
  getCustomer,
  updateCustomer,
  insertInvestment,
  cancelInvestment,
  updateInvestment,
  rescueInvestment,
};
