const Web3 = require('web3');
const webutils = require('web3-utils')
const ethUtil = require('ethereumjs-util')
const keccak256 = require("keccak256");
const { BigNumber, ethers } = require('ethers');

var defaultAccount;
var printLog = true;

App = {
    web3Provider: null,
    erc20ABI: null,
    uniV2PairABI: null,
    enableWalletConnect: false,
    nftprice:0,
    nfttotal:0,
    jscallback:null,
    connectMetamask: function () {
        if(printLog)console.log("connectMetamask")
        if (typeof window.ethereum != 'undefined') {
            App.initWeb3();
        } else {
           
        }
    },
    getTokenId:function(){
        var query = window.location.href;
        if(printLog)console.log("getTokenId url="+query)
        var vars = query.split("?");
        // for (var i=0;i<vars.length;i++) {
        //         var pair = vars[i].split("=");
        //         if(pair[0] == variable){return pair[1];}
        // }
        var id = vars[vars.length-1]
        var walletp = document.getElementById('tokenid');
        if(printLog)console.log("getTokenId "+id)
        walletp.innerText = id;
    },
    openURL:function(){
        window.open("https://hujunjob.github.io/OSTest/", "_blank");
    },
    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof window.ethereum != 'undefined') {
            if (printLog) console.log("Metamask is installed!");
            App.web3Provider = window.ethereum;
            if (printLog) console.log(window.ethereum);
            web3 = new Web3(window.ethereum);
            window.ethereum.on('accountsChanged', (accounts) => {
                // Handle the new accounts, or lack thereof.
                // "accounts" will always be an array, but it can be empty.
                if (printLog) console.log("accountsChanged "+defaultAccount);
                if(defaultAccount) window.location.reload();
            });

            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have a very good reason not to.
                if (printLog) console.log("chainChanged "+defaultAccount);
                if(defaultAccount) window.location.reload();
            });
            if (printLog) console.log("chainid=" + window.ethereum.chainId);
            var chainId = window.ethereum.chainId;

            ////chainId === "0x1" main, chainId === "0x3" ropsten, chainId === "0x4" rinkey

            return App.initWallet();
        }else{
            if (printLog) console.log("Metamask is not installed!");
        }
    },
    initWallet: async function () {
        if (printLog) console.log("initWallet");
        var v = web3.version;
        if (printLog) console.log("web3 version=" + v);
        let accounts = await ethereum.request(
            {
                method: 'eth_requestAccounts'
            }
        );
        if (printLog) console.log("account=" + accounts[0]);
        defaultAccount = web3.utils.toChecksumAddress(accounts[0]);
        var walletp = document.getElementById('walletp');
        walletp.innerText = defaultAccount;
    },
}