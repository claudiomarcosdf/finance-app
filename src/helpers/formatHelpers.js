function formatCurrency(value) {
  if (value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return '';
}

function formatNumber(value) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function americanFormat(valueString) {
  const removePoints = valueString.replaceAll('.', '');
  return removePoints.replace(',', '.');
}

function formatDateBr(date) {
  if (!date) {
    return;
  }

  const dateToFormat = date.substring(0, 10);
  const currentDate = new Date(dateToFormat);
  const dateFormated = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(currentDate);

  return dateFormated;
}

function formatDateToField(date) {
  //Recebe uma data string : 2008-01-01T00:00:00.000Z e devolve apenas a data para uso nos componentes
  if (!date) {
    return;
  }
  const dateFormated = date.substring(0, 10);
  return dateFormated;
}

//Retorna primeira letra em Caixa alta
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getFirstName(value) {
  if (value) {
    const firstName = value.substring(0, value.indexOf(' '));
    return capitalize(firstName);
  }
}

function calcRentability(value) {
  // M = C x (1 + i)t
  const capital = toCurrencyUSA(value.capital);
  const taxa = value.interest / 100;
  const result = capital * (1 + taxa) ** value.months;
  return parseFloat(result.toFixed(2));
}

function toCurrencyUSA(value) {
  //Se houver vírgula no valor
  if (value.toString().indexOf(',') !== -1) {
    return parseFloat(americanFormat(value.toString()));
  }
  return parseFloat(value);
}

export {
  formatCurrency,
  formatNumber,
  formatDateBr,
  capitalize,
  formatDateToField,
  getFirstName,
  calcRentability,
  toCurrencyUSA,
};
