
const projectId = "9f1b52e7c40edb6f1e0e4d17ef999999";

const { WalletConnectModal } = window.WalletConnectModal;
const modal = new WalletConnectModal({
  projectId,
  chains: [1],
});

document.getElementById("connectBtn").onclick = async function () {
  try {
    const session = await modal.openModal();

    const provider = new ethers.providers.Web3Provider(session.ethereum);
    const signer = provider.getSigner();

    const walletAddress = await signer.getAddress();
    document.getElementById("address").innerText = "Wallet: " + walletAddress;

    const rawBalance = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(rawBalance);
    document.getElementById("balance").innerText = "Balance: " + balance + " ETH";

    modal.closeModal();
  } catch (err) {
    console.log(err);
    alert("Wallet connect error!");
  }
};
