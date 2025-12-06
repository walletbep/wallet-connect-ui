
// Create WalletConnect instance
const connector = new WalletConnect.default({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: WalletConnectQRCodeModal.default
});

// Button click event
document.getElementById("connectBtn").addEventListener("click", async () => {
  if (!connector.connected) {
    await connector.createSession(); // This opens the QR Modal
  }
});
