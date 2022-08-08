import { useState,useEffect } from "react";
import { connectAccount, checkLogin } from "./web3/connect";

export default function Header({p}) {
    const [walletModal, setWalletModal] = useState(false)
    const [connected, setConnected] = useState(false)
    const {setAddress, address} = p

    useEffect(() => {
        checkLogin().then((r) => {
            if(r.status)
            setConnected(true)
            connectAccount(r.provider).then((result) => {
                setAddress(result.address)
            })
           })
    })
    function connect(x){
       
        connectAccount(x).then((result) => {
            setAddress(result.address)
        })
    }
    return (
        <>
        <div className="header">
            <div className="content">
                <div className="connect pointer" onClick={() => setWalletModal(!walletModal)}><span>{connected ? address : "Connect"}</span></div>
            </div>
        </div>

      {walletModal && (
          <div className="modal-bg">
          <div className="modal-container">
              <div className="modal-wallet">
                  <button className="close pointer"  onClick={() => setWalletModal(!walletModal)}>X</button>
                  <h4 className="title">
                      Connect your wallet
                  </h4>
                  <p className="text"> Pilih salah satu <i>Provider</i></p>
                  <div className="wallet pointer" onClick={() => connect('metamask')}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605"/>
                      <span>Metamask</span>
                  </div>
                  <div className="wallet pointer" onClick={() => connect('walletconnect')}>
                  <img src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"/>

                      <span>Wallet Connect</span>
                  </div>
              </div>
          </div>
      </div>
      )}
        </>
    )
} 