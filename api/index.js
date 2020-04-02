import axios from 'axios';

axios.defaults.baseURL = 'http://catusita-api.seekdev.com';

const Api = class Api {
  constructor() {
    this.axios = axios;
  }

  login = async (payload) => {
    const { data } = await this.axios.post('/login', payload);
    return data;
  }

  async getList(token) {
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await this.axios.get('/catalogo', { headers });
    return data;
  }
};

export default new Api();
