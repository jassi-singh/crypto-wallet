export const ENCRYPTED_WALLET_KEY = "@encryptedWallet";
export const ACCOUNTS_LENGTH = "@accountsLength";
export const IMPORTED_TOKENS = "@importedTokens";
export const TRANSACTION_HISTORY = "@transactionHistory";
export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
