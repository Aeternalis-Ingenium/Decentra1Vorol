import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { D1VToken_backend } from "../../../declarations/D1VToken_backend"; 

function Balance() {
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await D1VToken_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await D1VToken_backend.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
