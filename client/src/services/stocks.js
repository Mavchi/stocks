import axios from 'axios'
import { token } from './token'
const baseUrl = 'http://localhost:3001/api/stocks'

const getAll = async () => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.get(baseUrl, config);
    return response.data
}

export default { getAll } // eslint-disable-line
