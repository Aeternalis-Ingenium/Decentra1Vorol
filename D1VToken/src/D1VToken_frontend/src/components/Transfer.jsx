import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { D1VToken_backend } from "../../../declarations/D1VToken_backend";

function Transfer() {
  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    setHidden(true);
    setDisable(true);
    const recipient = Principal.fromtText(recipientId);
    const amountToTransfer = Number(amount)
    const result = await D1VToken_backend.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisable(false)
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>
          {feedback}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
