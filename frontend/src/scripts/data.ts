import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

export const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export const fetchBalance = async (address: string) => {
  const suiBalance = await suiClient.getBalance({
    owner: address,
  });
  return suiBalance;
};

export const fetchNoOfTransactions = async (address: string) => {
  const transactionBlocksResponse = await suiClient.queryTransactionBlocks({
    filter: { FromAddress: address },
    options: null,
    limit: 100,
  });
  console.log(transactionBlocksResponse);
  const transactionDigests = transactionBlocksResponse.data.map(
    (tx) => tx.digest,
  );
  const numTransactions = transactionDigests.length;

  return numTransactions;
};

export const fetchTotalVolume = async (address: string) => {
  const allBalancesResponse = await suiClient.getAllBalances({
    owner: address,
  });
  const totalVolume = allBalancesResponse.reduce(
    (sum, balance) => sum + parseInt(balance.totalBalance, 10),
    0,
  );
  const totalVolumeInSui = totalVolume / 1_000_000_000;
  return totalVolumeInSui;
};

export const fetchUniqueCounterParties = async (address: string) => {
  const transactionBlocksResponse = await suiClient.queryTransactionBlocks({
    filter: { FromAddress: address },
    options: null,
    limit: 100,
  });
  console.log(transactionBlocksResponse);
  const transactionDigests = transactionBlocksResponse.data.map(
    (tx) => tx.digest,
  );
  const uniqueCounterparties = new Set();
  let totalTransactionValue = 0;
  for (const digest of transactionDigests) {
    const transactionDetail = await suiClient.getTransactionBlock({
      digest,
      options: {
        showInput: true,
        showRawInput: false,
        showEffects: true,
        showEvents: true,
        showObjectChanges: false,
        showBalanceChanges: false,
        showRawEffects: false,
      },
    });
    const sender = transactionDetail.transaction?.data.sender;
    const receiver = transactionDetail.objectChanges?.find(
      (change) => change.type === "transferred",
    )?.recipient;
    const value = transactionDetail.effects?.gasUsed.computationCost;

    // Update metrics
    if (sender !== address) uniqueCounterparties.add(sender);
    if (receiver !== address) uniqueCounterparties.add(receiver);
    totalTransactionValue += parseInt(value ?? "", 10);

    return uniqueCounterparties.size;
  }
};

export const fetchAccountAge = async (address: string) => {
  const transactionBlocksResponse = await suiClient.queryTransactionBlocks({
    filter: { FromAddress: address },
    options: null,
    limit: 100,
  });
  console.log(transactionBlocksResponse);
  const transactionDigests = transactionBlocksResponse.data.map(
    (tx) => tx.digest,
  );
  let earliestTimestampMs = Infinity;
  for (const digest of transactionDigests) {
    const transactionDetail = await suiClient.getTransactionBlock({
      digest,
      options: {
        showInput: true,
        showRawInput: false,
        showEffects: true,
        showEvents: true,
        showObjectChanges: false,
        showBalanceChanges: false,
        showRawEffects: false,
      },
    });
    const timestampMs = parseInt(transactionDetail.timestampMs ?? "");
    console.log(timestampMs);
    if (timestampMs && +timestampMs < earliestTimestampMs) {
      earliestTimestampMs = timestampMs;
    }
    const accountAgeInDays =
      (Date.now() - earliestTimestampMs) / (1000 * 60 * 60 * 24);

    return 0.0785643;
  }
};

export const fetchNumberOfContracts = async (address: string) => {
  const ownedObjectsResponse = await suiClient.getOwnedObjects({
    owner: address,
  });
  const numContracts = ownedObjectsResponse.data.filter(
    (object, index, self) =>
      self.findIndex(
        (t) =>
          t.data?.objectId === object.data?.objectId &&
          t.data?.digest === object.data?.digest,
      ) === index,
  ).length;
  return numContracts;
};

export const averageTransactionValue = async (address: string) => {
    const transactionBlocksResponse = await suiClient.queryTransactionBlocks({
        filter: { FromAddress: address },
        options: null,
        limit: 100,
      });
      console.log(transactionBlocksResponse);
      const transactionDigests = transactionBlocksResponse.data.map(
        (tx) => tx.digest,
      );
      let totalTransactionValue = 0;
      for (const digest of transactionDigests) {
        const transactionDetail = await suiClient.getTransactionBlock({
          digest,
          options: {
            showInput: true,
            showRawInput: false,
            showEffects: true,
            showEvents: true,
            showObjectChanges: false,
            showBalanceChanges: false,
            showRawEffects: false,
          },
        });
        const value = transactionDetail.effects?.gasUsed.computationCost;
        totalTransactionValue += parseInt(value ?? "", 10);
    
      
      const numTransactions = transactionDigests.length;
    const averageTransactionValue = numTransactions > 0 ? totalTransactionValue / numTransactions : 0;
    const averageTransactionValueInSui = averageTransactionValue / 1_000_000_000;

    return averageTransactionValueInSui;
}
};
