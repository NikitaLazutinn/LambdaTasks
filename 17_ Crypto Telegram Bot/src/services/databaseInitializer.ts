import currenciesRepository from "../database/repositories/currenciesRepository";
import { CurrencyModel } from "../models/CurrencyModel";

export async function addCurrenciesToDb() {
  try{
    const existingCurrencies = await currenciesRepository.getAllAsync();
    if (existingCurrencies.length == 0) {
    currenciesRepository.addManyAsync(baseCurrencies);
        }
  }catch(err){
    currenciesRepository.createTable();
    addCurrenciesToDb();
  }

}

const baseCurrencies: CurrencyModel[] = [
  {
    Id: "bitcoin",
    CurrencyCode: "BTC",
    CurrencyName: "Bitcoin",
    CoinPapricaId: "btc-bitcoin",
  },
  {
    Id: "ethereum",
    CurrencyCode: "ETH",
    CurrencyName: "Ethereum",
    CoinPapricaId: "eth-ethereum",
  },
  {
    Id: "binance-coin",
    CurrencyCode: "BNB",
    CurrencyName: "Binance Coin",
    CoinPapricaId: "bnb-binance-coin",
  },
  {
    Id: "ripple",
    CurrencyCode: "XRP",
    CurrencyName: "Ripple",
    CoinPapricaId: "xrp-xrp",
  },
  {
    Id: "cardano",
    CurrencyCode: "ADA",
    CurrencyName: "Cardano",
    CoinPapricaId: "ada-cardano",
  },
  {
    Id: "solana",
    CurrencyCode: "SOL",
    CurrencyName: "Solana",
    CoinPapricaId: "sol-solana",
  },
  {
    Id: "dogecoin",
    CurrencyCode: "DOGE",
    CurrencyName: "Dogecoin",
    CoinPapricaId: "doge-dogecoin",
  },
  {
    Id: "matic-network",
    CurrencyCode: "MATIC",
    CurrencyName: "Polygon",
    CoinPapricaId: "matic-polygon",
  },
  {
    Id: "dai",
    CurrencyCode: "DAI",
    CurrencyName: "Dai",
    CoinPapricaId: "dai-dai",
  },
  {
    Id: "polkadot",
    CurrencyCode: "DOT",
    CurrencyName: "Polkadot",
    CoinPapricaId: "dot-polkadot",
  },
  {
    Id: "shiba-inu",
    CurrencyCode: "SHIB",
    CurrencyName: "Shiba Inu",
    CoinPapricaId: "shib-shiba-inu",
  },
  {
    Id: "tron",
    CurrencyCode: "TRX",
    CurrencyName: "TRON",
    CoinPapricaId: "trx-tron",
  },
  {
    Id: "avalanche",
    CurrencyCode: "AVAX",
    CurrencyName: "Avalanche",
    CoinPapricaId: "avax-avalanche",
  },
  {
    Id: "litecoin",
    CurrencyCode: "LTC",
    CurrencyName: "Litecoin",
    CoinPapricaId: "ltc-litecoin",
  },
  {
    Id: "cosmos",
    CurrencyCode: "ATOM",
    CurrencyName: "Cosmos",
    CoinPapricaId: "atom-cosmos",
  },
  {
    Id: "chainlink",
    CurrencyCode: "LINK",
    CurrencyName: "Chainlink",
    CoinPapricaId: "link-chainlink",
  },
  {
    Id: "ethereum-classic",
    CurrencyCode: "ETC",
    CurrencyName: "Ethereum Classic",
    CoinPapricaId: "etc-ethereum-classic",
  },
  {
    Id: "ftx-token",
    CurrencyCode: "FTT",
    CurrencyName: "FTX Token",
    CoinPapricaId: "ftt-ftx-token",
  },
  {
    Id: "stellar",
    CurrencyCode: "XLM",
    CurrencyName: "Stellar",
    CoinPapricaId: "xlm-stellar",
  },
  {
    Id: "monero",
    CurrencyCode: "XMR",
    CurrencyName: "Monero",
    CoinPapricaId: "xmr-monero",
  },
  {
    Id: "bitcoin-cash",
    CurrencyCode: "BCH",
    CurrencyName: "Bitcoin Cash",
    CoinPapricaId: "bch-bitcoin-cash",
  },
  {
    Id: "crypto-com-chain",
    CurrencyCode: "CRO",
    CurrencyName: "Crypto.com Coin",
    CoinPapricaId: "cro-cryptocom-chain",
  },
  {
    Id: "vechain",
    CurrencyCode: "VET",
    CurrencyName: "VeChain",
    CoinPapricaId: "vet-vechain",
  },
  {
    Id: "filecoin",
    CurrencyCode: "FIL",
    CurrencyName: "Filecoin",
    CoinPapricaId: "fil-filecoin",
  },
  {
    Id: "flow",
    CurrencyCode: "FLOW",
    CurrencyName: "Flow",
    CoinPapricaId: "flow-flow",
  },
  {
    Id: "tezos",
    CurrencyCode: "XTZ",
    CurrencyName: "Tezos",
    CoinPapricaId: "xtz-tezos",
  },
  {
    Id: "aave",
    CurrencyCode: "AAVE",
    CurrencyName: "Aave",
    CoinPapricaId: "aave-new",
  },
  {
    Id: "eos",
    CurrencyCode: "EOS",
    CurrencyName: "EOS",
    CoinPapricaId: "eos-eos",
  },
  {
    Id: "theta-token",
    CurrencyCode: "THETA",
    CurrencyName: "THETA",
    CoinPapricaId: "theta-theta-token",
  },
  {
    Id: "chiliz",
    CurrencyCode: "CHZ",
    CurrencyName: "Chiliz",
    CoinPapricaId: "chz-chiliz",
  },
  {
    Id: "zcash",
    CurrencyCode: "ZEC",
    CurrencyName: "Zcash",
    CoinPapricaId: "zec-zcash",
  },
  {
    Id: "iota",
    CurrencyCode: "MIOTA",
    CurrencyName: "IOTA",
    CoinPapricaId: "miota-iota",
  },
  {
    Id: "dash",
    CurrencyCode: "DASH",
    CurrencyName: "Dash",
    CoinPapricaId: "dash-dash",
  },
  {
    Id: "kava",
    CurrencyCode: "KAVA",
    CurrencyName: "Kava",
    CoinPapricaId: "kava-kava",
  },
  {
    Id: "zilliqa",
    CurrencyCode: "ZIL",
    CurrencyName: "Zilliqa",
    CoinPapricaId: "zil-zilliqa",
  },
];