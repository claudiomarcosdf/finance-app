const customerModel = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  birthday: '',
  personal_data: {
    cpf: '',
    rg: '',
    gender: '',
    nationality: '',
    civil_status: '',
    father_name: '',
    mother_name: '',
    residence: {
      address: '',
      complement: '',
      city: '',
      uf: '',
      cep: '',
    },
    contacts: {
      cellphone1: '',
      cellphone2: '',
      phone: '',
    },
    photo_url: '',
    photo_name: '',
    indicated: '',
    documents: {
      cpf_url: '',
      cpf_name: '',
      rg_url: '',
      rg_name: '',
      residence_url: '',
      residence_name: '',
    },
  },
  profile: {
    score: 0,
  },
  bank_data: {
    agency: '',
    account_number: '',
    bank: '',
  },
};

export default customerModel;
