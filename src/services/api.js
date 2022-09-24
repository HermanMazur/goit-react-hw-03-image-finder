import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '28073476-1b954c798cfd531f8b6d916de';

function fetchPicture(name, page) {
  const response = axios.get(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response;
}

const api = { fetchPicture };
export default api;
