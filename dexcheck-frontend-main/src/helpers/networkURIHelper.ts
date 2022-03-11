export const getChaindId = (chainName: string) => {
  let networkId;
  switch (chainName) {
    case 'bsc':
      networkId = 54;
      break;
  }
  return networkId;
};

export const getNetworkURI = (networkId: number) => {
  let uri = '';
  switch (networkId) {
    case 54:
      uri = 'https://bscscan.com/address/';
      break;
  }
  return uri;
};

export const gettxURI = (networkId: number) => {
  let uri = '';
  switch (networkId) {
    case 54:
      uri = 'https://bscscan.com/tx/';
      break;
  }
  return uri;
};
