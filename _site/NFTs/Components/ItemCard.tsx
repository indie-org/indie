/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { NFT, NFTConfigs } from "../../types.d.ts";
import { gfm, h } from "../../deps.ts";

interface NFTItemProp {
    config: NFTConfigs;
    nft: NFT;
}

export default function ItemCard(
    {config, nft}: NFTItemProp
) {
    const link = () => {
        let uri = `${nft.pathname}?`
        if (nft.contract_address) {
            uri += `address=${nft.contract_address}`
        }
        if (nft.token_id) {
            if (uri.includes('address=')) {
                uri += `&tokenID=${nft.token_id}`
            } else {
                uri += `tokenID=${nft.token_id}`
            }
        }
        if (uri.endsWith('?')) {
            uri = uri.split('?')[0]
        }
        return uri
    }

    return (
        <div className="flex flex-row pt-12 first:pt-0">
            <div className="basis-3/4">
                <h3 className="text-3xl font-bold">
                    <a className=""
                       href={link()}>
                        {nft.title}
                    </a>
                </h3>
                <p className="mt-3 text-base">
                    {nft.description && <span className='font-semibold text-gray-600 dark:text-gray-200'>{`${nft.description}`} {" "}</span>}
                </p>
                <p className="mt-3 text-base">
                    Owner: {nft.owner_of && <span className='text-gray-500/80'>{`${nft.owner_of}`} {" "}</span>}
                </p>
                <p className="mt-3 text-base">
                    Contract Address: {nft.contract_address &&
                    <span className='text-gray-500/80'>{` ${nft.contract_address}`} {" "}</span>}
                </p>
                <p className="mt-3 text-base">
                    {nft.token_id && <span>Token ID:</span>}
                    {nft.token_id && <span className='text-gray-500/80'>{` ${nft.token_id}`} {" "}</span>}
                </p>
                <p className="mt-3 text-base">
                    {nft.contract_type && <span>Token Standard:</span>}
                    {nft.contract_type &&
                        <span className='text-gray-500/80'>{` ${nft.contract_type}`}</span>}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{nft.snippet}</p>
                {nft}
                <p className="mt-3">
                    {(config.categoryType == 'article') ?
                        <a
                            className="leading-tight text-gray-900 dark:text-gray-100 inline-block border-b-1 border-gray-600 hover:text-gray-500 hover:border-gray-500 transition-colors"
                            href={nft.pathname}
                            title={`Read "${nft.title}"`}
                        >
                            Read More
                        </a> : null
                    }
                </p>
            </div>
            <div className="basis-1/4">
                {(config.categoryType == 'article') ? <img src={nft.nftImage} className="rounded"/> :
                    <a className=""
                       href={link()}>
                        <img src={nft.nftImage ? nft.nftImage : './not-found.png' } className="rounded"/>
                    </a>
                }
            </div>
        </div>
    );
}
