import axios from 'axios';
import config from '../config'; 

export function createDateFilter(endpoint, setData) {
  return async ({ startDate, endDate }) => {
    try {
      const token = localStorage.getItem('elizaAuthToken');
      const { data } = await axios.get(`${config.API_BASE_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { startDate, endDate },
      });
      setData(data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };
}
