import axios from "axios";
import constants from "../../constants";
class CoinbaseRequests {
  async requestDataAsync(currencyTag: string) {
    try {
      const responce = await axios.get(
        `${constants.COINBASE_URL}${currencyTag}`
      );
      return responce.data;
    } catch (err) {
      console.log(err);
    }
  }
}
const coinbaseRequests = new CoinbaseRequests();
export default coinbaseRequests;