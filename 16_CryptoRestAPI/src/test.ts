import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://openapiv1.coinstats.app/coins/bitcoin',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'rLxvcy0arm3uP5xBmETuW2lxWvbgmpK2SvcrVYFe9fo='
  }
};

const l = axios
  .request(options)
  .then(function (response) {
   // console.log(response.data);
  })
  .catch(function (error) {
   // console.error(error);
  });
  console.log(l);