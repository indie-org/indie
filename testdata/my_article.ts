import myNFTs from "../NFTs/NFTs.tsx";
import {NFTConfigs} from "../types.d.ts";
import { opApiKey } from "../keys.ts"

//op mainnet
const OP_API_KEY = opApiKey;
const ARTICLE_OP_ADDRESS = '0xC0CBf706Fa55ea946D8FD9912E0f7F9D30fD3b0B'

const configs: NFTConfigs = {
    title: 'Co-ownership as a web3 social primitive',
    author: 'Chase Chapman',
    apikey: OP_API_KEY,
    tokenAddress: ARTICLE_OP_ADDRESS,
    tokenID: '2',
    categoryType: 'article',
    chainType: 'Optimism',
    description: "Co-ownership as a web3 social primitive ",
    coverTextColor:'white',
    avatar: "https://cdn-icons-png.flaticon.com/512/4729/4729485.png",
    avatarClass: "rounded-md",
    cover: 'https://mirror-media.imgix.net/nft/O_lMN8kXSylktFxr-SmAu.png?h=null&w=null&auto=compress',
    favicon: 'https://dash.deno.com/assets/logo.svg',
    links: [
        {title: "vecivedi@gmail.com", url: "mailto:vecivedi@gmail.com"},
        {title: "opensea", url: "https://opensea.io/collection/archive-of-peaceminusone-2016/drop"},
        {title: 'Binance', url: 'https://www.binance.com/en/nft/home'}
    ]
}

myNFTs(configs);