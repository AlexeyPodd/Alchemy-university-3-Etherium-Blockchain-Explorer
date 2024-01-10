import { useState } from 'react';
import alchemy from "./networkSettings";

function Transaction({hash}) {
	const [infoExpand, setinfoExpand] = useState(false);
	const [transactionInfo, setTransactionInfo] = useState();
	const [value, setValue] = useState();

    const showTransactionInfo = async () => {
    	if (!infoExpand) {
    		setTransactionInfo(await alchemy.core.getTransactionReceipt(hash));
    		setValue(((await alchemy.core.getTransaction(hash)).value / 10 ** 18).toString());
    	}
        setinfoExpand(!infoExpand);
    }

	return (
		<li>
		{hash} <span><button type='button' onClick={showTransactionInfo}>...</button></span>
		{infoExpand
        ? <div id={hash+"-info"}>
        	<p><b>To:</b> {transactionInfo.to}</p>
        	<p><b>From:</b> {transactionInfo.from}</p>
        	<p><b>Value:</b> {value + " ETH"}</p>
        	<p><b>Contract Address:</b> {transactionInfo.contractAddress}</p>
        	<p><b>Status</b> {transactionInfo.status}</p>
        	<p><b>Gas Used:</b> {transactionInfo.gasUsed.toString()}</p>
        	<p><b>Cummulative Gas Used</b> {transactionInfo.cumulativeGasUsed.toString()}</p>
        	<p><b>Effective Gas Price</b> {transactionInfo.effectiveGasPrice.toString()}</p>
        </div>
        : null}
		</li>
	);
}

export default Transaction;