import { useState } from "react";

function BlockInfo({transactions}) {
  const [transactionsExpand, setTransactionsExpand] = useState(false);
  return (
    <div className="block-info">
      <div className="block-main-info">
        
      </div>
      <span>
        Transactions: <span><button type="button" onClick={() => setTransactionsExpand(!transactionsExpand)}>{transactionsExpand ? "collapse list" : "show list"}</button></span>
      </span>
      <ol>
      {transactionsExpand
        ? transactions.map((transaction) => {
            return <li key={transaction.hash}>{transaction.hash}</li>
          })
        : null}
      </ol>      
    </div>
  );
}

export default BlockInfo;