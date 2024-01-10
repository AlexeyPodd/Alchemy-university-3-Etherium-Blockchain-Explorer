import TransactionsInfo from "./TransactionsInfo";
import { useEffect, useState } from 'react';
import alchemy from "./networkSettings";
import './App.css';


function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockData, setblockData] = useState({});
  const [balance, setBalance] = useState(0);

  const updateBlockNumber = (event) => {
    event.preventDefault();
    setBlockNumber(parseInt(event.target.blockNumber.value));
  }

  const getAddressBalance = async (event) => {
    event.preventDefault();
    setBalance(((await alchemy.core.getBalance(event.target.address.value))/ 10 ** 18).toString() + " ETH");
  }

  useEffect(() => {
    async function updateBlockInfo() {
      if (blockNumber === undefined) setBlockNumber(await alchemy.core.getBlockNumber());
      setblockData((await alchemy.core.getBlockWithTransactions(blockNumber)));
    }
    updateBlockInfo();
  }, [blockNumber]);

  return <div className="App">
          <div className="block-main-info">            
            <form id="form-balance" onSubmit={getAddressBalance}>
              <input name='address' type="text"/>
              <button type="submit">Get Balance</button>
            </form>
            <span id="balance">{balance}</span>
            <hr></hr>
            <form id="form-block-number" onSubmit={updateBlockNumber}>
              <input name='blockNumber' type="number"/>
              <button type="submit">Find Block</button>
            </form>
            <p><b>Block Number:</b> {blockData.number}</p>
            <p><b>Block Hash:</b> {blockData.hash}</p>
            <p><b>Block Parent Hash:</b> {blockData.parentHash}</p>
            <p><b>Time Stamp:</b> {blockData.timestamp}</p>
            <p><b>Gas Limit:</b> {blockData.gasLimit ? blockData.gasLimit.toString() : ''}</p>
            <p><b>Used Gas:</b> {blockData.gasUsed ? blockData.gasUsed.toString() : ''}</p>
            <p><b>Miner Address:</b> {blockData.miner}</p>
          </div>
          <TransactionsInfo transactions={blockData.transactions}/>
        </div>;
}

export default App;
