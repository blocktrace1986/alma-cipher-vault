import { Address } from 'viem';

// Contract ABI for AlmaCipherVault
export const ALMA_CIPHER_VAULT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "uint32", "name": "dataType", "type": "uint32"}
    ],
    "name": "VaultEntryCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "updater", "type": "address"}
    ],
    "name": "VaultEntryUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": false, "internalType": "uint32", "name": "permissionLevel", "type": "uint32"}
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"}
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "logId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "actor", "type": "address"}
    ],
    "name": "AuditLogCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint32", "name": "reputation", "type": "uint32"}
    ],
    "name": "ReputationUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": false, "internalType": "uint32", "name": "encryptedValue", "type": "uint32"}
    ],
    "name": "DataEncrypted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "entryId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "requester", "type": "address"}
    ],
    "name": "DataDecrypted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "entryId", "type": "uint256"}
    ],
    "name": "getVaultEntryInfo",
    "outputs": [
      {"internalType": "uint32", "name": "dataType", "type": "uint32"},
      {"internalType": "uint32", "name": "encryptedData", "type": "uint32"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isPublic", "type": "bool"},
      {"internalType": "string", "name": "metadataHash", "type": "string"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "uint256", "name": "lastModified", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserReputation",
    "outputs": [
      {"internalType": "uint32", "name": "", "type": "uint32"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserPermissions",
    "outputs": [
      {"internalType": "uint32", "name": "", "type": "uint32"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract addresses (to be deployed)
export const CONTRACT_ADDRESSES = {
  ALMA_CIPHER_VAULT: import.meta.env.VITE_VAULT_CONTRACT_ADDRESS as Address || '0x0000000000000000000000000000000000000000',
  FHE_CONTRACT: import.meta.env.VITE_FHE_CONTRACT_ADDRESS as Address || '0x0000000000000000000000000000000000000000',
} as const;

// Data types for vault entries
export const DATA_TYPES = {
  DOCUMENT: 1,
  FINANCIAL: 2,
  MEDIA: 3,
  PERSONAL: 4,
} as const;

// Permission levels
export const PERMISSION_LEVELS = {
  READ: 1,
  WRITE: 2,
  ADMIN: 3,
} as const;

// Action types for audit logs
export const ACTION_TYPES = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
} as const;