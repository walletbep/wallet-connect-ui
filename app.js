async function waitForWC() {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (window.WalletConnectSignClient) {
        clearInterval(timer);
        resolve(window.WalletConnectSignClient);
      }
    }, 200);
  });
}

async function init() {
  const SignClient = await waitForWC();

  const client = await SignClient.init({
    projectId: "a50f4d7d1e8bd4111c564ffd0e123456",
    relayUrl: "wss://relay.walletconnect.com"
  });

  document.getElementById("connectBtn").onclick = async () => {
    const { uri, approval } = await client.connect({
      requiredNamespaces: {
        eip155: {
          chains: ["eip155:1", "eip155:56", "eip155:137"],
          methods: ["eth_sendTransaction", "personal_sign"],
          events: ["accountsChanged", "chainChanged"]
        }
      }
    });

    if (uri) {
      window.open(
        `https://explorer.walletconnect.com/?type=wc&uri=${encodeURIComponent(uri)}`,
        "_blank"
      );
    }

    const session = await approval();

    const account = session.namespaces.eip155.accounts[0];
    const [ , chainId, address] = account.split(":");

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("addr").innerText = address;
    document.getElementById("chain").innerText = chainId;
  };
}

init();
