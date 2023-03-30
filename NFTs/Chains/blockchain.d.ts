import { CategoryType } from "../../types.d.ts";

export interface Attributes {
    display_type?: string;
    trait_type: string;
    value: string;
}

export interface NFTMetaData {
    name: string;
    description?: string;
    image?: string;
    video?: string;
    animation_url?: string;
    background_color?: string;
    external_link?: string;
    attributes?: Attributes[];
    content?: string;
    owner_of?: string;
    contractAddress?: string;
    token_id?: string;
    contract_type?: string;
    token_uri?: string;
    properties?: Properties;
    category_type?: CategoryType;
}

export interface Properties {
    creators: NFTOwner[];
    category: CategoryType;
    files: string[];
    post_id: string;
}

export interface CollectionData {
    token_address: string;
    contract_type: string;
    name: string;
    symbol: string;
    token_id: string;
    owner_of: string;
    token_uri: string;
    amount: string;
}

export interface CollectionsMeta {
    total: string;
    page: string;
    page_size: string
    result: CollectionData[]
}

/*solana types*/
export interface SolanaNFTMetadata {
    mint: string;
    standard: string;
    name: string;
    symbol: string;
    metaplex: Metaplex
}

export interface Metaplex {
    metadataUri: string;
    updateAuthority: string;
    sellerFeeBasisPointsL: number;
    primarySaleHappened: number;
    owners: NFTOwner[];
    isMutable: boolean;
    masterEdition: boolean;
}

export interface NFTOwner {
    address: string;
    verified?: number;
    share: number;
}

export type SolanaNetwork = "devnet" | "mainnet";


export interface SolanaNFTCollectionMetadata {
    associatedTokenAddress: string;
    mint: string;
    name: string;
    symbol: string;
}

/*Arweave*/
export interface ArweaveContent {
    body: string;
    timestamp: string;
    title: string;
}

export interface Algorithm {
    name: string;
    hash: string;
}

export interface Authorship {
    contributor: string;
    signingKey: string;
    signature: string;
    signingKeySignature: string;
    signingKeyMessage: string;
    algorithm: Algorithm
}

export interface WNFT {
    chainId: number;
    description: string;
    fee: number;
    fundingRecipient: string;
    imageURI: string;
    mediaAssetId: string;
    name: string;
    nonce: number;
    price: number;
    proxyAddress: string;
    renderer: string;
    supply: number;
    symbol: string;
}

export interface ArweaveMetadata {
    content: ArweaveContent;
    digest: string;
    authorship: Authorship;
    version: string;
    wnft: WNFT;
}
