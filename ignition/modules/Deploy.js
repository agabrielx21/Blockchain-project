const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TOTAL_SUPPLY = 10000;
const INITIAL_SWAP_SUPPLY = 1000;
const SEND_TOKENS_TO_SWAP_CONTRACT = 1000;
const SAME_RATE = 1;

module.exports = buildModule("DeployModule", (m) => {
  const token = m.contract("Ether", [TOTAL_SUPPLY], {});
  const token2 = m.contract("Tether", [TOTAL_SUPPLY], {});
//   const pair = m.contract("Pair", [token.address, token2.address], {});
  const router = m.contract("Router", [], {});
  const dex = m.contract("DEX", [router]);
  m.call(token, "approve", [dex, INITIAL_SWAP_SUPPLY]);
  m.call(token2, "approve", [dex, INITIAL_SWAP_SUPPLY]);
  m.call(token, "transfer", [dex, SEND_TOKENS_TO_SWAP_CONTRACT] )
  m.call(token2, "transfer", [dex, SEND_TOKENS_TO_SWAP_CONTRACT] )
  m.call(router, "createPair", [token, token2, SAME_RATE]);
  // m.call(router, "createPair", [token2, token, SAME_RATE]);
  return { token, token2, router, dex};
});
