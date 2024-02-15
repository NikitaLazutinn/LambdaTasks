import axios from "axios";
import constants from "../../constants";
class KucoinRequests {
  async requestData(currenciesTags: string) {
    const responce = await axios.get(
      `${constants.KUCOIN_URL}${currenciesTags}`
    );
    return responce.data.data;
  }
}
const kucoinRequests = new KucoinRequests();
export default kucoinRequests;