import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { D1VToken_backend, canisterId, createActor } from "../../../declarations/D1VToken_backend";

function Faucet() {
  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Hell Yeah!")
  
  async function handleClick(event) {
    setDisable(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
  
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setText(result)
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Aeternalis-Ingenium tokens here! Claim 10,000 D1V tokens to your account.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
