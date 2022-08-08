import Web3  from "web3";

export const connectAccount = async(wallet) => {

    const setProvider = async (wallet) => {
        if(wallet == 'metamask'){
            await ethereum.request({method : 'eth_requestAccounts'})
            return window.ethereum
        }else if(wallet == 'walletconnect') {
            const {default : WalletConnectProvider } = await import(
                '@walletconnect/web3-provider'
            )
            const walletConnectProvider = new WalletConnectProvider({
                chainId: 56,
                rpc: {
                    56 : "https://bsc-dataseed.binance.org"
                }
            })
            await walletConnectProvider.enable()
            return walletConnectProvider
        }
    } 

    const web3 = new Web3(
        await setProvider(wallet)
    )
    const addresses = await web3.eth.getAccounts()
    const address = addresses[0]
    const chainId = await web3.eth.getChainId()
    const balance = web3.utils.fromWei((await web3.eth.getBalance(address)), 'ether')

    return {address,chainId,balance}

}

export const checkLogin = async () => {
    const Metamask = await ethereum.request({method : 'eth_accounts'})
    if(Metamask.length === 0) {
        const {default : WalletConnectProvider } = await import(
            '@walletconnect/web3-provider'
        )
        const walletConnectProvider = new WalletConnectProvider({
            chainId: 56,
            rpc: {
                56 : "https://bsc-dataseed.binance.org"
            }
        })
        if(walletConnectProvider.wc._accounts.length === 0 ){
            return {status: false}
        }else{
            return {status: true, provider: 'walletconnect'}
        }
        
    }else{
        return {status: true, provider: 'metamask'}
    }

}