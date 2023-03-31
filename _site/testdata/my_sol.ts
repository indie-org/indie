import myNFTs from "../NFTs/NFTs.tsx";
import {NFTConfigs} from "../types.d.ts";
import { moralisApiKey } from "../keys.ts"

const MORALIS_API_KEY = moralisApiKey;


//EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6
//6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
// sol mainnet
const SOL_WALLET = "EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6";
const SOL_TOKEN_ADDRESS = 'DDy5QHKEDgg5ZyWmwi1rJKwYHe7ZR5udGQfJkc8EPfLM'


const configs: NFTConfigs = {
    title: 'Solana NFT',
    author: 'Jimmy',
    // tokenAddress: SOL_TOKEN_ADDRESS,
    apikey: MORALIS_API_KEY,
    walletAddress: SOL_WALLET,
    categoryType: 'image',
    chainType: 'Solana',
    description: "Welcome to the home of MONKEY on OpenSea. Discover the best items in this collection.",
    coverTextColor:'white',
    avatar: "https://bafybeifiwhjifflt4o3252abd2dycuymzzocvhc2v6e2w3vongcgyto2qm.ipfs.nftstorage.link/168.gif",
    avatarClass: "rounded-md",
    cover: 'https://tm7fatpjxeolkdqcdo5mkurxytydxhr4axcwhk5poxzrewbuqpkq.arweave.net/mz5QTem5HLUOAhu6xVI3xPA7njwFxWOrr3XzElg0g9U?ext=gif',
    links: [
        {title: "vecivedi@gmail.com", url: "mailto:vecivedi@gmail.com"},
        {title: "opensea", url: "https://opensea.io/collection/archive-of-peaceminusone-2016/drop"},
        {title: 'Binance', url: 'https://www.binance.com/en/nft/home'}
    ]
}

myNFTs(configs);