import myNFTs from "../NFTs/NFTs.tsx";
import {NFTConfigs} from "../types.d.ts";
import { moralisApiKey } from "../keys.ts"

const MORALIS_API_KEY = moralisApiKey;
const BSC_CONTRACT_ADDRESS = '0xf9938bc37d7be7bb8444326d70d13478beb7d83d'

const configs: NFTConfigs = {
    title: 'Otherdeed',
    author: 'Jimmy',
    apikey: MORALIS_API_KEY,
    // tokenID:'13',
    contractAddress: BSC_CONTRACT_ADDRESS,
    categoryType: 'video',
    chainType: 'BSC',
    description: "Welcome to the home of MONKEY on OpenSea. Discover the best items in this collection.",
    coverTextColor:'white',
    avatar: "https://assets.otherside.xyz/otherdeeds/89561f877b88d4dc51bad965cf6a854970738d640e7910c4ca7bd11d75608a0e.jpg",
    avatarClass: "rounded-md",
    cover: 'https://assets.otherside.xyz/otherdeeds/62a17937dfc2e63d001599d85d1ad96c3cb86683b31dd6d9e12de55d96088b1c.jpg',
    links: [
        {title: "vecivedi@gmail.com", url: "mailto:vecivedi@gmail.com"},
        {title: "opensea", url: "https://opensea.io/collection/archive-of-peaceminusone-2016/drop"},
        {title: 'Binance NFT', url: 'https://www.binance.com/en/nft/home'}
    ]
}

myNFTs(configs);