import 'regenerator-runtime/runtime';
import axios from 'axios';

const BASE_URL = 'https://temparray.free.beeceptor.com';

const getfirstArray = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/firstArray`);

    const todoItems = response.data;

    console.log( todoItems);

    return todoItems;
  } catch (errors) {
    console.error(errors);
  }
};

getfirstArray()