import Web3 from "https://deno.land/x/web3/mod.ts";
import {NFTMetaData} from "./blockchain.d.ts";

export default class Optimism {
    private url:URL
    constructor(apikey: string) {
        this.url = new URL('https://api-optimistic.etherscan.io')
        this.url.searchParams.set('apikey', apikey)
    }

    private async getContractABI(address: string): Promise<any> {
        this.url.pathname = "/api"
        this.url.searchParams.set('module', 'contract')
        this.url.searchParams.set('action', 'getabi')
        this.url.searchParams.set('address', address)
        const contractInfo = await fetch(this.url.toString());
        const contractABI = await contractInfo.json();
        return Promise.resolve(JSON.parse(contractABI.result))
    }

    private async readContract(contract_address: string): Promise<any> {
        const abiResult = await this.getContractABI(contract_address);
        if (abiResult)  {
            const netURL = 'https://mainnet.optimism.io/'
            const provider = new Web3.providers.HttpProvider(netURL)
            const web3 = new Web3(provider);
            const MyContract = new web3.eth.Contract(
                abiResult,
                contract_address
            );
            return Promise.resolve(MyContract.methods)
        }else {
            return new Promise((resolve, reject) => {
                reject("contract ABI is empty");
            });
        }
    }

    async getNFTCollectionMatadatas(contract_address: string): Promise<NFTMetaData> {
       const methods = await this.readContract(contract_address);
       const image = await methods.imageURI().call();
       const content = await methods.contentURI().call();
        const name = await methods.name().call();
       const data: NFTMetaData = {
            name: name,
            image: `https://ipfs.io/ipfs/${image}`,
            content: content
        }
    
       return Promise.resolve(data)
    }

    async getNFTMatadata(token_address: string, tokenId: number): Promise<NFTMetaData> {
        const abiResult = await this.getContractABI(token_address);
        if (abiResult)  {
            const netURL = 'https://mainnet.optimism.io/'
            const provider = new Web3.providers.HttpProvider(netURL)
            const web3 = new Web3(provider);
            const MyContract = new web3.eth.Contract(
                abiResult,
                token_address
            );

            const tokenURI = await MyContract.methods.tokenURI(tokenId).call();
            const owner_of = await MyContract.methods.ownerOf(tokenId).call();
            const res = this.parseBase64EncodedInfoToJson(tokenURI)
            const meta = {
                owner_of,
                contract_type: 'Token Program',
                ...res
            } as NFTMetaData

            return new Promise((resolve, reject) => {
                resolve(meta);
            });
        } else {
            console.log("Error");
            return new Promise((resolve, reject) => {
                reject("contract ABI is empty");
            });
        }
    }

    private parseBase64EncodedInfoToJson(base64Encoded: string): any {
        const encodedString = base64Encoded.split("base64,")[1];
        const decodedString = atob(encodedString);
        return JSON.parse(decodedString)
    }
}