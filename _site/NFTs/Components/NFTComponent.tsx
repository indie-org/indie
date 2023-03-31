/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import {NFT, NFTConfigs} from "../../types.d.ts";
import {h} from "../../deps.ts";
import ItemCard from './ItemCard.tsx'
import Footer from "./Footer.tsx";

export interface NFTItemProps {
    config: NFTConfigs;
    nfts: NFT[];
}

const socialAppIcons = new Map([
    ["opensea.io", OpenseaIcon],
    ['binance.com', BinanceIcon]
]);

export function NFTItem({config, nfts}: NFTItemProps) {
    return (
        <div class="home">
            {config.header || (
                <header
                    class="w-full h-90 lt-sm:h-80 bg-cover bg-center bg-no-repeat "
                    style={{
                        backgroundImage: config.cover ? `url(${config.cover})` : undefined,
                    }}
                >
                    <div class="max-w-screen-sm h-full px-6 mx-auto flex flex-col items-center justify-center">
                        {config.avatar && (
                            <a
                                href="/"
                                class={[
                                    "mt-5 bg-cover bg-center bg-no-repeat w-35 h-35 border-4 border-white",
                                    config.avatarClass ?? "rounded-md",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                style={{backgroundImage: `url(${config.avatar})`}}
                            />
                        )}
                        <h1
                            class="mt-3 text-4xl text-gray-900 dark:text-gray-100 font-bold"
                            style={{color: config.coverTextColor}}
                        >
                            {config.title ?? "My NFTs"}
                        </h1>
                        {config.description && (
                            <p
                                class="text-lg text-gray-600 dark:text-gray-400"
                                style={{color: config.coverTextColor}}
                            >
                                {config.description}
                            </p>
                        )}
                        {config.links && (
                            <nav class="mt-3 flex gap-2">
                                {config.links.map((link) => {
                                    const url = new URL(link.url);
                                    let Icon = IconExternalLink;
                                    if (url.protocol === "mailto:") {
                                        Icon = IconEmail;
                                    } else {
                                        const icon = socialAppIcons.get(
                                            url.hostname.replace(/^www\./, ""),
                                        );
                                        if (icon) {
                                            Icon = icon;
                                        }
                                    }

                                    return (
                                        <a
                                            class="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-600/10 dark:bg-gray-400/10 text-gray-700 dark:text-gray-400 hover:bg-gray-600/15 dark:hover:bg-gray-400/15 hover:text-black dark:hover:text-white transition-colors group"
                                            href={link.url}
                                            rel={link.target === "_blank"
                                                ? "noopener noreferrer"
                                                : ""}
                                            target={link.target ?? "_self"}
                                        >
                                            {link.icon ? link.icon : <Icon/>}
                                            <Tooltip>{link.title}</Tooltip>
                                        </a>
                                    );
                                })}
                            </nav>
                        )}
                    </div>
                </header>
            )}

            <div class="max-w-screen-md px-6 mx-auto">
                <div class="pt-16 lt-sm:pt-12 border-t-1 border-gray-300/80">
                    {nfts.map((nft) => (
                        <ItemCard config={config} nft={nft} key={nft.token_id}/>
                    ))}
                </div>

                {config.footer || <Footer author={config.author}/>}
            </div>
        </div>
    );
}

function Tooltip({children}: { children: string }) {
    return (
        <div
            className={"absolute top-10 px-3 h-8 !leading-8 bg-black/80 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"}
        >
      <span
          className="block absolute text-black/80"
          style={{top: -4, left: "50%", marginLeft: -4.5, width: 9, height: 4}}
      >
        <svg
            className="absolute"
            width="9"
            height="4"
            viewBox="0 0 9 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M3.83564 0.590546C4.21452 0.253758 4.78548 0.253758 5.16436 0.590546L9 4H0L3.83564 0.590546Z"
              fill="currentColor"
          />
        </svg>
      </span>
            {children}
        </div>
    );
}

function IconEmail() {
    return (
        <svg
            className="inline-block w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.99963 18C8.9063 18 7.87297 17.7899 6.89963 17.3696C5.9263 16.9499 5.07643 16.3765 4.35003 15.6496C3.6231 14.9232 3.04977 14.0733 2.63003 13.1C2.20977 12.1267 1.99963 11.0933 1.99963 10C1.99963 8.89333 2.20977 7.8568 2.63003 6.8904C3.04977 5.92347 3.6231 5.0768 4.35003 4.3504C5.07643 3.62347 5.9263 3.04987 6.89963 2.6296C7.87297 2.20987 8.9063 2 9.99963 2C11.1063 2 12.1428 2.20987 13.1092 2.6296C14.0762 3.04987 14.9228 3.62347 15.6492 4.3504C16.3762 5.0768 16.9495 5.92347 17.3692 6.8904C17.7895 7.8568 17.9996 8.89333 17.9996 10V11.16C17.9996 11.9467 17.7298 12.6165 17.19 13.1696C16.6498 13.7232 15.9863 14 15.1996 14C14.7196 14 14.273 13.8933 13.8596 13.68C13.4463 13.4667 13.1063 13.1867 12.8396 12.84C12.4796 13.2 12.0564 13.4835 11.57 13.6904C11.0831 13.8968 10.5596 14 9.99963 14C8.89297 14 7.94977 13.6099 7.17003 12.8296C6.38977 12.0499 5.99963 11.1067 5.99963 10C5.99963 8.89333 6.38977 7.94987 7.17003 7.1696C7.94977 6.38987 8.89297 6 9.99963 6C11.1063 6 12.0498 6.38987 12.83 7.1696C13.6098 7.94987 13.9996 8.89333 13.9996 10V11.16C13.9996 11.5467 14.1196 11.8499 14.3596 12.0696C14.5996 12.2899 14.8796 12.4 15.1996 12.4C15.5196 12.4 15.7996 12.2899 16.0396 12.0696C16.2796 11.8499 16.3996 11.5467 16.3996 11.16V10C16.3996 8.25333 15.7695 6.74987 14.5092 5.4896C13.2495 4.22987 11.7463 3.6 9.99963 3.6C8.25297 3.6 6.7495 4.22987 5.48923 5.4896C4.2295 6.74987 3.59963 8.25333 3.59963 10C3.59963 11.7467 4.2295 13.2499 5.48923 14.5096C6.7495 15.7699 8.25297 16.4 9.99963 16.4H13.9996V18H9.99963ZM9.99963 12.4C10.6663 12.4 11.233 12.1667 11.6996 11.7C12.1663 11.2333 12.3996 10.6667 12.3996 10C12.3996 9.33333 12.1663 8.76667 11.6996 8.3C11.233 7.83333 10.6663 7.6 9.99963 7.6C9.33297 7.6 8.7663 7.83333 8.29963 8.3C7.83297 8.76667 7.59963 9.33333 7.59963 10C7.59963 10.6667 7.83297 11.2333 8.29963 11.7C8.7663 12.1667 9.33297 12.4 9.99963 12.4Z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconExternalLink() {
    return (
        <svg
            className="inline-block w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.66715 5.83333C6.66715 5.3731 7.04025 5 7.50049 5L14.1672 5C14.6274 5 15.0005 5.3731 15.0005 5.83333V12.5C15.0005 12.9602 14.6274 13.3333 14.1672 13.3333C13.7069 13.3333 13.3338 12.9602 13.3338 12.5V7.84518L6.42308 14.7559C6.09764 15.0814 5.57 15.0814 5.24457 14.7559C4.91913 14.4305 4.91913 13.9028 5.24457 13.5774L12.1553 6.66667L7.50049 6.66667C7.04025 6.66667 6.66715 6.29357 6.66715 5.83333Z"
                fill="currentColor"
            />
        </svg>
    );
}

function OpenseaIcon() {
    return (
        <img class='w-10 h-10' src='https://upload.wikimedia.org/wikipedia/commons/2/26/OpenSea_icon.svg'/>
    );
}

function BinanceIcon() {
    return (
        <img class='w-10 h-10 object-fill' src='https://bin.bnbstatic.com/static/images/common/favicon.ico'/>
    );
}