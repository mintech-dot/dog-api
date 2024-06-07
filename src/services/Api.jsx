import axios from 'axios';

export const fetchBreeds = async () => {
  const response = await axios.get('https://dog.ceo/api/breeds/list/all');
  return response.data.message;
};

export const fetchBreedImages = async (breed) => {
  const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/1`);
  return response.data.message;
};
