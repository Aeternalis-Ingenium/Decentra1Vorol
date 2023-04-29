import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    await handleAuthenticatedClient(authClient);
  } else {
    await authClient.login(
      {
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          ReactDOM.render(<App />, document.getElementById("root"));
        }
      }
    );
  }
}

async function handleAuthenticatedClient(authClient) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();
