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
        if (!this._instance) {
            this._instance = new Web3(env.web3Provider);
            // Add environment account to wallet if provided
            if (env.account.privateKey) {
                this._instance.eth.accounts.wallet.add(env.account.privateKey);
            }
        }
        return this._instance
    }
}

export default Web3Singleton.Instance;
