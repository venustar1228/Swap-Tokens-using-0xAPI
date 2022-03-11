import axios from 'axios';
import * as Bitquery from './bitquery';

const lastBarsCache = new Map();
const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
};

export default {
  onReady: (callback) => {
    console.log('[onReady]: Method called!!');
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // console.log('====Search Symbols running')
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    console.log('[resolveSymbol]: Method called!!');
    const response = await axios.post(
      Bitquery.endpoint,
      {
        query: Bitquery.GET_COIN_INFO,
        variables: {
          tokenAddress: symbolName,
        },
        mode: 'cors',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'BQYpjiNNVAPoPk7lNFzrp5AdlZdQlsG6',
        },
      }
    );
    // const coin = response.data.data.ethereum.dexTrades[0].baseCurrency;
    // console.log(response.data.data.ethereum.dexTrades[0].quotePrice);
    console.log(response.data.data.ethereum.dexTrades[0].baseCurrency);

    const coin = response.data.data.ethereum.dexTrades[0].baseCurrency;
    if (!coin) {
      onResolveErrorCallback();
    } else {
      const symbol = {
        ticker: symbolName,
        name: `${coin.symbol}/USD`,
        session: '24x7',
        timezone: 'Etc/UTC',
        minmov: 1,
        pricescale: 10000000,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60'],
        has_empty_bars: true,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 1,
        data_status: 'streaming',
      };
      //onSymbolResolvedCallback(symbol);
      onSymbolResolvedCallback(symbol);
    }
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    try {
      if (resolution === '1D') {
        resolution = 1440;
      }

      const response2 = await axios.post(
        Bitquery.endpoint,
        {
          query: Bitquery.GET_COIN_BARS,
          variables: {
            from: new Date('2021-06-20T07:23:21.000Z').toISOString(),
            to: new Date('2021-06-23T15:23:21.000Z').toISOString(),
            interval: Number(resolution),
            tokenAddress: symbolInfo.ticker,
          },
          mode: 'cors',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYpjiNNVAPoPk7lNFzrp5AdlZdQlsG6',
          },
        }
      );

      const bars = response2.data.data.ethereum.dexTrades.map((el) => ({
        time: new Date(el.timeInterval.minute).getTime(), // date string in api response
        low: el.low,
        high: el.high,
        open: Number(el.open),
        close: Number(el.close),
        volume: el.volume,
      }));

      if (bars.length) {
        onHistoryCallback(bars, { noData: false });
      } else {
        onHistoryCallback(bars, { noData: true });
      }
    } catch (err) {
      console.log({ err });
      // onErrorCallback(err)
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // console.log('=====subscribeBars runnning')
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log('=====unsubscribeBars running')
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //optional
    // console.log('=====calculateHistoryDepth running')
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: 'D', intervalBack: '1' }
      : undefined;
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    // console.log('=====getMarks running')
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    //optional
    // console.log('=====getTimeScaleMarks running')
  },
  getServerTime: (cb) => {
    // console.log('=====getServerTime running')
  },
};
