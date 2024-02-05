import axios from "axios";
import constants from "../../constants";

class CoinMarketCapRequests {
  async requestDataAsync(codes: string) {
    try {
      const responce = await axios.get(
        `${constants.COIN_MARKET_CAP_URL}?symbol=${codes}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": constants.COIN_MARKET_CAP_API_KEY,
          },
        }
      );
      return responce.data.data;
    } catch (err) {
      console.log(err);
    }
  }
}
const coinMarketCapRequests = new CoinMarketCapRequests();
export default coinMarketCapRequests;