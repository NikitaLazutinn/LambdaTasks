import axios from "axios";
import constants from "../../constants";
class CoinpapricaRequests {
  async requestDataAsync() {
    try {
      const responce = await axios.get(
        constants.COINPAPRICA_URL as string
      );
      return responce.data;
    } catch (err) {
      console.log(err);
    }
  }
}
const coinpapricaRequests = new CoinpapricaRequests();
export default coinpapricaRequests;