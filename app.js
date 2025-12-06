const connectBtn = document.getElementById("connectBtn");
const addressTxt = document.getElementById("address");
const balanceTxt = document.getElementById("balance");

connectBtn.addEventListener("click", connectWallet);

async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("MetaMask install karo!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    addressTxt.textContent = "Address: " + address;

    const balance = await provider.getBalance(address);
    const ethBalance = ethers.utils.formatEther(balance);
    balanceTxt.textContent = "Balance: " + ethBalance + " ETH";

  } catch (err) {
    console.log(err);
    alert("Wallet connect error!");
  }
}
