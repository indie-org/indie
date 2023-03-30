import { ArweaveMetadata } from "./blockchain.d.ts";


export default class Arweave {
    static async getStorageMetadata(storageURI: string): Promise<ArweaveMetadata> {

        if (storageURI.startsWith("ar:")) {
            const _length = 'ar://'.length
            const itemID= storageURI.substring(_length)
            const arwResponse = await fetch(`https://arweave.net/${itemID}`);
            return await arwResponse.json();
        } else if (storageURI.startsWith("https:")) {
            const arwResponse = await fetch(storageURI);
            return await arwResponse.json();
        } else {
            const arwResponse = await fetch(`https://arweave.net/${storageURI}`);
            return await arwResponse.json();
            // return Promise.reject('invalid URI')
        }
    }
}