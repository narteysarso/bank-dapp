import { ethers, utils } from "ethers";
import abi from "../contract/Bank.json";


const contractABI = abi.abi;
const contractAddress = '0x632C26907ba147C685cBF771700dEeD28839f3cd';

export async function checkIfWalletIsConnected() {
    //Metamask adds an ethereum object to the window object
    if (!window.ethereum) {
        throw Error("Please install a Metamask Wallet to use our bank");
    }
}

function getContract(){
    
    checkIfWalletIsConnected();

    // get provider to establish connection with blockchain with Metamask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //signer lets u sign transaction without revealing you private key by abstracting the Metamask wallet
    const signer = provider.getSigner();
    //get contract with contact address, abi, and signer
    const bankContract = new ethers.Contract(contractAddress, contractABI, signer);

    return bankContract;
}

export async function getWalletAccount() {

    checkIfWalletIsConnected();

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    return account;
}

export async function getBankName() {
    
    const bankContract = getContract();

    let bankName = await bankContract.bankName();

    if(!bankName){
        return "";
    }

    //convert bankName to readable string
    bankName = utils.parseBytes32String(bankName || "");
    

    return bankName;

}

export async function getBankOwner() {
    
    const bankContract = getContract();

    const owner = await bankContract.bankOwner();

    return owner;
}

export async function setBankName(newBankName) {
    
    const bankContract = getContract();

    const txn = await bankContract.setBankName(utils.formatBytes32String(newBankName));
    console.log('Setting Bank name....');
    console.log(txn);
    await txn.wait();
    console.log('Bank name changed', txn.hash);

}


export async function getCustomerBalance(){
    const bankContract = getContract();

    const balance = await bankContract.getCustomerBalance();

    return utils.formatEther(balance);
}

export async function depositMoney(amountInEther) {
    
    const bankContract = getContract();

    //convert eth to wei
    
    const amountInWei = utils.parseEther(amountInEther);

    
    const txn = await  bankContract.depositMoney({value: amountInWei})
    console.log("Depositing money...");
    await txn.wait()
    console.log("Money with deposite...done", txn.hash);

    return txn;
}

export async function withdrawMoney(address,amountInEther){
    const bankContract = getContract();

    //convert eth to wei
    const amountInWei = utils.parseEther(amountInEther);
    
    const txn = await bankContract.withdrawMoney(address, amountInWei)
    console.log(amountInEther)
    console.log("Withdrawing money...");
    await txn.wait()
    console.log("Money with drew...done", txn.hash);

    return txn;
}