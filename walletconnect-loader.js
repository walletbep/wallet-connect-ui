(async () => {
  try {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/@walletconnect/sign-client@2.10.1/dist/index.umd.js"
    );
    window.WalletConnectSignClient = module.SignClient;
    console.log("WalletConnect v2 Loaded Successfully!");
  } catch (err) {
    console.error("WalletConnect Load Error:", err);
  }
})();
