// 导入dotenv模块
import { config } from "https://deno.land/x/dotenv/mod.ts";

// 加载.env文件中的配置变量
const env = config();

//https://admin.moralis.io/web3apis
export const moralisApiKey = env.MORALIS_API_KEY;
//https://optimistic.etherscan.io/myapikey
export const opApiKey = env.OP_API_KEY;
