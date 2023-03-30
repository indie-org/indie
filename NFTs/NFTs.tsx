/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import {
    ColorScheme,
    Fragment,
    h,
    html, HtmlOptions,
    serve,
    UnoCSS,
} from "../deps.ts";
import type { NFTConfigs, NFT } from "../types.d.ts";
import Solana from "./Chains/Solana.ts";
import EVM from "./Chains/EVM.ts";
import Optimism from "./Chains/Optimism.ts";
import Arweave from "./Chains/Arweave.ts";
import IPFS from "./Chains/IPFS.ts";

import { NFTItem } from "./Components/NFTComponent.tsx";
import DetailPage from './Components/DetailPage.tsx'
import ImageBrowser from "./Components/ImageBrowser.tsx";
import VideoPlayer from "./Components/VideoPlayer.tsx";

export {Fragment, h};

let Configs: NFTConfigs = {
    categoryType: 'image',
    chainType: 'ETH',
    apikey: '',
}
let NFTMetas: Partial<NFT>[] = []

export default async function myNFTs(configs?: NFTConfigs) {
    html.use(UnoCSS(configs?.unocss)); // Load custom unocss module if provided
    html.use(ColorScheme("auto"));

    if (!configs?.apikey) {
        await serve(() => new Response('apikey absolutely need'), {port: 8000})
    }

    Configs = configs as NFTConfigs
    if (!configs?.chainType) {
        await serve(() => new Response('chainType must be valid'), {port: 8000})
    }

    switch (configs?.chainType) {
        case "ETH":
        case "BSC":
        {
            // console.log(configs.chainType)
            await evmFetch(configs);
            break;
        }
        case "Solana": {
            const sol = new Solana('mainnet', configs?.apikey);
            if (configs?.tokenAddress) {
                const nft = await sol.getNFTMatadata(configs?.tokenAddress);
                NFTMetas = [{
                    title: nft.name,
                    nftImage: nft.image,
                    pathname: configs.categoryType,
                    contract_type: nft.contract_type,
                    contract_address: nft.contractAddress,
                    owner_of: nft.owner_of
                }];
            }
            if (configs?.walletAddress) {
                const nfts = await sol.getNFTsByWallet(configs?.walletAddress)

                NFTMetas = nfts.map((nft) => {
                    return  {
                        title: nft.name,
                        nftImage: nft.image,
                        pathname: configs.categoryType,
                        contract_type: nft.contract_type,
                        contract_address: nft.contractAddress,
                        owner_of: nft.owner_of
                    };
                })
            }

            break;
        }
        case 'Optimism': {
            if (!configs?.tokenAddress) {
                await serve(() => new Response('tokenAddress must be valid'), {port: 8000})
            }
            const op = new Optimism(configs?.apikey)
            if (configs?.tokenID) {
                const nftMetaData = await op.getNFTMatadata(configs?.tokenAddress as string, configs?.tokenID)
                NFTMetas = [
                    {
                        title: nftMetaData.name,
                        nftImage: IPFS.ipfs2https(nftMetaData?.image),
                        pathname: configs.categoryType,
                        token_id: configs?.tokenID,
                        content: nftMetaData.content,
                        contract_address: configs.tokenAddress,
                        contract_type: nftMetaData.contract_type,
                        owner_of: nftMetaData.owner_of
                    }
                ]
            } else {
                const collectionMetas = await op.getNFTCollectionMatadatas(configs?.tokenAddress)
                NFTMetas = [
                    {
                        title: collectionMetas.name,
                        ogImage: collectionMetas.image,
                        pathname: configs.categoryType,
                        content: collectionMetas.content,
                    }
                ]
            }
            break;
        }
        default: {
            break;
        }
    }

    await serve(handler, {port: 8000});
}

async function evmFetch(configs: NFTConfigs) {
    if (!configs?.chainType) {
        return
    }
    const evm = new EVM(configs?.apikey, configs?.chainType)
    if (configs?.walletAddress) {
        const collections = await evm.getNFTCollectionsByWallet(configs?.walletAddress)
        NFTMetas = collections.map((item) => {
            return {
                title: item.name,
                nftImage: item.image,
                nftVideo: item.video,
                pathname: configs.categoryType,
                token_id: item.token_id,
                contract_type: item.contract_type,
                contract_address: item.contractAddress,
                owner_of: item.owner_of,
                description: item.description
            }
        })
    }
    if (configs?.contractAddress) {
        //evm每个合约地址就是一个合集，根据tokenID找到具体的NFT，没有，则是合集内全部NFT
        const nfts = await evm.getNFTByContract(configs?.contractAddress, configs?.tokenID)
        // console.log('nfts',nfts)
        NFTMetas = nfts.map((item)=>{
            return {
                title: item.name,
                nftImage: item.image,
                nftVideo: item.video,
                pathname: configs.categoryType,
                token_id: item.token_id,
                contract_type: item.contract_type,
                contract_address: item.contractAddress,
                owner_of: item.owner_of,
                description: item.description
            }
        });
    }
}

const timestampToDate = (timestamp: string): Date => {
    const ts = parseInt(timestamp) * 1000;
    return new Date(ts);
}

async function handler(
    req: Request
) {
    const {pathname, searchParams} = new URL(req.url);
    // console.log('pathname',pathname)
    if (Configs?.categoryType === 'article' && pathname == '/article') {
        return await routeArticleDetail()
    }
    else if(Configs?.categoryType === 'image' && pathname == '/image') {
        const tokenID = searchParams.get('tokenID')
        const address = searchParams.get('address')
        // console.log('routeImageDetail', address, tokenID)
        if (address) {
            return routeImageDetail(address, tokenID)
        }
    }
    else if(Configs?.categoryType === 'video' && pathname == '/video') {
        const tokenID = searchParams.get('tokenID')
        const address = searchParams.get('address')
        // console.log('routeVideoDetail', address, tokenID)
        if (address) {
            return routeVideoDetail(address, tokenID)
        }
    }
    else {
        const sharedHtmlOptions: HtmlOptions = {
            links: [
                {
                    href: Configs.favicon ?? "https://dash.deno.com/assets/logo.svg",
                    type: "image/x-icon",
                    rel: "icon"
                }
            ],
        };
        return html({
            ...sharedHtmlOptions,
            title: Configs.title ?? "My NFTs",
            meta: {},
            styles: [],
            body: <NFTItem config={Configs as NFTConfigs} nfts={NFTMetas}/>,
        });
    }
}

async function routeArticleDetail() {
    const meta = NFTMetas[0];
    const article = await Arweave.getStorageMetadata(meta?.content)
    const {body, timestamp} = article.content
    const nft: NFT = {
        title: meta.title,
        pathname: 'more',
        nftImage: meta.nftImage,
        markdown: `${body}`,
        publishDate: timestampToDate(timestamp)
    }

    const sharedHtmlOptions: HtmlOptions = {
        links: [
            {
                href: Configs.favicon ?? "https://dash.deno.com/assets/logo.svg",
                type: "image/x-icon",
                rel: "icon"
            }
        ],
    };

    return html({
        ...sharedHtmlOptions,
        title: Configs.title ?? "My NFTs",
        meta: {},
        styles: [],
        body: <DetailPage config={Configs} nft={nft}/>,
    });
}

function routeImageDetail(contract_address:string, tokenID?: string) {
    let meta: NFT = {}
    if (contract_address) {
        meta = NFTMetas.filter((item) => (item.contract_address === contract_address))[0];
    }
    if(contract_address && tokenID){
        meta = NFTMetas.filter((item) => (item.token_id === tokenID))[0];
    }

    const nft: NFT = {
        title: meta.title ?? '',
        nftImage: meta.nftImage,
    }

    const sharedHtmlOptions: HtmlOptions = {
        links: [
            {
                href: Configs.favicon ?? "https://dash.deno.com/assets/logo.svg",
                type: "image/x-icon",
                rel: "icon"
            }
        ],
    };

    return html({
        ...sharedHtmlOptions,
        title: Configs.title ?? "My NFTs",
        meta: {},
        styles: [],
        body: <ImageBrowser config={Configs} nft={nft}/>,
    });
}

function routeVideoDetail(contract_address:string, tokenID?: string) {
    let meta: NFT = {}
    if (contract_address) {
        meta = NFTMetas.filter((item) => (item.contract_address === contract_address))[0];
    }
    if(contract_address && tokenID){
        meta = NFTMetas.filter((item) => (item.token_id === tokenID))[0];
    }

    const nft: NFT = {
        title: meta.title ?? '',
        nftVideo: meta.nftVideo,
    }

    const sharedHtmlOptions: HtmlOptions = {
        links: [
            {
                href: Configs.favicon ?? "https://dash.deno.com/assets/logo.svg",
                type: "image/x-icon",
                rel: "icon"
            }
        ],
    };

    return html({
        ...sharedHtmlOptions,
        title: Configs.title ?? "My NFTs",
        meta: {},
        styles: [],
        body: <VideoPlayer config={Configs} nft={nft}/>,
    });
}