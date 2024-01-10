import { useState } from "react";
import Transaction from "./Transaction";

function TransactionsInfo({transactions}) {
  const [transactionsExpand, setTransactionsExpand] = useState(false);
  return (
    <div className="transactions-info">
      <button type="button" onClick={() => setTransactionsExpand(!transactionsExpand)}>{transactionsExpand ? "Hide Transactions" : "Show Transactions"}</button>
      <ol>
      {transactionsExpand
        ? transactions.map((transaction) => {
            return <Transaction key={transaction.hash} hash={transaction.hash}/>
          })
        : null}
      </ol>      
    </div>
  );
}

export default TransactionsInfo;