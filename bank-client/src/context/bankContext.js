import { createContext, useEffect, useState } from "react";
import * as bankServices from "../services/bank";


export const BankContext = createContext();


export function BankProvider({ children, ...props }) {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isBankOwner, setIsBankOwner] = useState(false);
    const [bankOwnerAddress, setBankOwnerAddress] = useState(false);
    const [customerTotalBalance, setCustomerTotalBalance] = useState(null);
    const [customerAddress, setCustomerAddress] = useState(null);
    const [currentBankName, setCurrentBankName] = useState(null);
    const [error, setError] = useState(null);
    const [depositLoading, setDepositLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [bankNameLoading, setBankNameLoading] = useState(false);



    const checkIfWalletIsConnected = async () => {
        try {
            const account = await bankServices.getWalletAccount();
            setIsWalletConnected(true);
            setCustomerAddress(account);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }

    const getBankName = async () => {
        try {
            const bankName = await bankServices.getBankName();
            setCurrentBankName(bankName);
        } catch (error) {
            console.log(error);
            setError(error.message);
            
        }
    }

    const setBankName = async (newBankName) => {
        try {
            setBankNameLoading(true);
            await bankServices.setBankName(newBankName);
            await getBankName();
        } catch (error) {
            console.log(error)
            setError(error.message);
        }finally{
            setBankNameLoading(false);
        }
    }

    const getBankOwner = async () => {
        try {

            const owner = await bankServices.getBankOwner();
            
            setBankOwnerAddress(owner);

            const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});

            if(owner.toLowerCase() === account.toLowerCase()){
                setIsBankOwner(true);
            }

        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }

    const getCustomerBalance = async () => {
        try {
            const balance = await bankServices.getCustomerBalance();
            setCustomerTotalBalance(balance);
        } catch (error) {
            setError(error.message);   
        }
    }

    const depositMoney = async (amountInEther) => {
        try {
            setDepositLoading(true);
            await bankServices.depositMoney(amountInEther);
            getCustomerBalance();

        } catch (error) {
            setError(error.message);
        }finally{
            setDepositLoading(false);
        }
    }

    const withdrawMoney = async (amountInEther) => {
        try {
            setWithdrawLoading(true);
            if(!customerAddress){
                throw Error("Customer doesn't have an address. Please use Metamask wallet")
            }
            
            await bankServices.withdrawMoney(customerAddress, amountInEther);
            getCustomerBalance();

        } catch (error) {
            setError(error.message);
        }finally{
            setWithdrawLoading(false);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getBankName();
        getBankOwner();
        getCustomerBalance();
    }, [isWalletConnected]);

    return (
        <BankContext.Provider value={{
            depositMoney,
            setBankName,
            withdrawMoney,
            isWalletConnected,
            isBankOwner,
            bankOwnerAddress,
            customerTotalBalance,
            customerAddress,
            currentBankName,
            bankNameLoading,
            withdrawLoading,
            depositLoading,
            error

        }}>
            {children}
        </BankContext.Provider>
    )
}