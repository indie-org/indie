# Indie

Using the [Deno Deploy](https://deno.com/deploy) service and the deno-blog template, quickly build a showcase for the NFTs you own to share with friends or potential buyers.

## Configure your parameters

You can customize your code as follows:

```js
import myNFTs from "https://raw.githubusercontent.com/indie-org/indie/main/NFTs/NFTs.tsx";

//https://admin.moralis.io/web3apis
const MORALIS_API_KEY = "<your moralis api key>";
//EVM
const EVM_CONTRACT_ADDRESS = '0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258';

myNFTs({
    title: 'Otherdeed',
    author: 'Jimmy',
    apikey: MORALIS_API_KEY,
    contractAddress: EVM_CONTRACT_ADDRESS,
    categoryType: 'image',
    chainType: 'ETH',
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
});
```
* [avatarClass](https://tailwindcss.com/docs/border-radius#rounding-corners-separately) : `rounded`, `rounded-md`, `rounded-lg`, `rounded-full`

## Use playground to deploy

First, you need to log in to [Deno Deploy](https://deno.com/deploy) using your GitHub account. Then, click on "New Project" and select "Playground". Once you're in the playground, paste the configured code and click on the "Save & Deploy" button. Wait a moment, and you will be able to preview the website on the right-hand side of the screen. The preview URL can be shared with anyone.
