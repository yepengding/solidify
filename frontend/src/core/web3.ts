import Web3 from 'web3';
import env from '@/core/env'

/**
 * Web3.js Singleton
 *
 * @author Yepeng Ding
 */
class Web3Singleton {
    private static _instance: Web3;

    public static get Instance(): Web3 {
        return this._instance || (this._instance = new Web3(env.web3Provider));
    }
}

export default Web3Singleton.Instance;
