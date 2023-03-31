export default class IPFS {
    // 检查链接符合http协议或ipfs协议
    static isValidTokenURL(uri: string) {
        const isHTTPS = /^http(s)?:\/\//.test(String(uri));
        const isIPFS = /^ipfs:\/\//.test(String(uri));
        return isHTTPS || isIPFS;
    }

// 将链接从ipfs协议转换http协议
    static ipfs2https(uri: string) {
        if (/^ipfs:\/\//.test(String(uri))) {
            const ipfs = new URL(uri);
            uri = new URL(['ipfs', `${ipfs.hostname}${ipfs.pathname}`].join('/'), 'https://ipfs.io').toString();
        }

        if (/http(s)?:\/\/(.*?)\/ipfs/.test(String(uri)) ) {
            // https://[CID].ipfs.nftstorage.link/[pathname]
            // https://nftstorage.link/ipfs/[CID]/[pathname]
            // https://[CID].ipfs.dweb.link/[pathname]
            // https://ipfs.io/ipfs/[CID]/[pathname]
            const url = new URL(uri);

            url.hostname = 'ipfs.io';
            url.port = '';
            uri = url.toString();
        }
        // console.log(uri)
        return uri;
    }

    static IPFSImageFileConverter(imageURI: string): string {
        const url = new URL(imageURI)
        if (url.protocol == 'https:') {
            return imageURI
        }
        let articleImage = ''
        const ipfsStorage = 'ipfs://'
        if (url.protocol == 'ipfs:') {
            const articleImageID = imageURI.substring(ipfsStorage.length)
            articleImage = `https://ipfs.io/ipfs/${articleImageID}`
        } else {
            articleImage = ''
        }
        return articleImage
    }
}
