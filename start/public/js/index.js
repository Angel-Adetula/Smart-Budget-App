const checkConnectedStatus = async function () {
  try {
    const connectedResponse = await fetch(`/api/is_user_connected`);
    const connectedData = await connectedResponse.json();
    console.log(JSON.stringify(connectedData));

    if (connectedData.status === true) {
      document.querySelector("#connectedUI").classList.remove("hidden");
      showInstitutionName();
    } else {
      document.querySelector("#disconnectedUI").classList.remove("hidden");
    }
  } catch (error) {
    console.error(`We encountered an error: ${error}`);
  }
};

const showInstitutionName = async function () {
  const bankData = await fetch("/api/get_bank_name");
  const bankJSON = await bankData.json();
  console.log(JSON.stringify(bankJSON));
  document.querySelector(
    "#connectDetails"
  ).textContent = `You are connected to ${bankJSON.name ?? "Unknown"}! `;
};

// Grab a list of most recent transactions
const getTransactions = async function () {
  const transactionResponse = await fetch(`/api/transactions`);
  const transactionData = await transactionResponse.json();
  const simplifiedData = transactionData.transactions.map((item) => {
    return {
      date: item.date,
      name: item.name,
      amount: `$${item.amount.toFixed(2)}`,
      categories: item.category.join(", "),
    };
  });
  console.table(simplifiedData);
  fetch("http://localhost:3003/transactions", 
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(simplifiedData)
    
  }).then(res=> console.log(res.status))


  window.location.replace("http://localhost:3000/displaytransactions");

};

document
  .querySelector("#getTransactions")
  .addEventListener("click", getTransactions);

checkConnectedStatus();