import axios from "axios";
import constants from "../../constants";
class CoinStatsRequests {

  async requestDataByIdAsync(currencyId: string) {
      const options = {
        method: 'GET',
        url: `https://openapiv1.coinstats.app/coins/${currencyId}`,
        headers: {
          accept: 'application/json',
          'X-API-KEY': constants.COINSTATS_API_KEY
        }
      };

        const response = await axios.request(options);
        return response.data; 

  }
}
const coinStatsRequests = new CoinStatsRequests();
export default coinStatsRequests;