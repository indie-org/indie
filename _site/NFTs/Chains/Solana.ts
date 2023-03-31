import { NFTMetaData, NFTOwner, SolanaNetwork, SolanaNFTCollectionMetadata } from './blockchain.d.ts'


export default class Solana {

    private url: URL
    private readonly network: SolanaNetwork
    private readonly headers: HeadersInit

    constructor(network: SolanaNetwork, api_key: string) {
        this.url = new URL('https://solana-gateway.moralis.io');
        this.network = network;
        this.headers = {
            "X-API-Key": api_key,
            accept: 'application/json'
        }
    }

    async getNFTMatadata(tokenAddress: string): Promise<NFTMetaData> {
        this.url.pathname = `/nft/${this.network}/${tokenAddress}/metadata`
        const jsonResponse = await fetch(this.url.toString(), {headers: this.headers});
        const metadataJson = await jsonResponse.json();

        const owner = metadataJson.metaplex.owners.map((item:NFTOwner)=>
            (item.address)
        ).join(' ');

        const uri: string = metadataJson.metaplex.metadataUri;
        if (uri) {
            //请求uri需要翻墙
            const response = await fetch(uri);
            const json = await response.json()
            const data: NFTMetaData = {
                name: json.name,
                image: json.image,
                contractAddress: tokenAddress,
                owner_of: owner
            }
            return Promise.resolve(data);
        } else {
            return Promise.reject('invalid metadataUri')
        }
    }

    async getNFTsByWallet(walletAddress: string): Promise<NFTMetaData[]> {
        this.url.pathname = `/account/${this.network}/${walletAddress}/nft`
        const jsonResponse = await fetch(this.url.toString(), {headers: this.headers});
        const metadataJson = await jsonResponse.json() as SolanaNFTCollectionMetadata[];

        const nfts: NFTMetaData[] = []
        for (const solanaNFT of metadataJson) {
            const data: NFTMetaData = await this.getNFTMatadata(solanaNFT.mint);
            nfts.push(data)
        }
        return Promise.resolve(nfts);
    }
}