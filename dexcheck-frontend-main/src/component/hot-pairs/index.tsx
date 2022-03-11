import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-easy-marquee';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { accountEllipsis } from '../../utils/common';

const HOT_PAIRS = gql`
  query pairInfo($hotPairInput: HotPairInput) {
    hotPairs(hotPairInput: $hotPairInput) {
      name
      address
    }
  }
`;

export default function HotPairs({ network }: any) {
  const [pairData, setPairData] = useState({
    name: '',
    address: '',
    image: '',
  });
  const { data, loading, error } = useQuery(HOT_PAIRS, {
    variables: {
      hotPairInput: {
        network: network,
      },
    },
  });

  // useEffect(() => {
  //   const arrangeData = async () => {
  //     console.log(data?.hotPairs);
  //     // const tokenMetaData = await axios(
  //     //   'https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/' +
  //     //     data.pairInfo.token0
  //     // );
  //     // setTokenMeta(tokenMetaData.data);
  //   };
  //   if (data) {
  //     arrangeData();
  //   }
  // }, [data]);

  return (
    <>
      <Box className='htpairs'>
        <Typography component='label'>HOT PAIRS</Typography>

        <Marquee
          duration={10000}
          reverse={true}
          pauseOnHover={true}
          height='45px'
        >
          <Box className='marqee_box'>
            {data &&
              data.hotPairs.map((hotPair: any) => {
                return (
                  <Link to='/' className='tknbx'>
                    <Box className='tkn_nmbr'>
                      <Box component='img' src='/img/hot_pairs_01.png' />
                    </Box>
                    <Box className='tkn_info'>
                      <Typography component='h4'>{hotPair.name}</Typography>
                      <Typography className='grntkn'>
                        {/* <Box component='img' src='/img/green_tkn.svg' /> */}
                        {accountEllipsis(hotPair.address)}
                      </Typography>
                    </Box>
                  </Link>
                );
              })}
          </Box>
        </Marquee>
      </Box>
    </>
  );
}
