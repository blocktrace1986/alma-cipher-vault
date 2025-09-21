import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { ALMA_CIPHER_VAULT_ABI, CONTRACT_ADDRESSES, DATA_TYPES, PERMISSION_LEVELS } from '../lib/contract';
import { toast } from 'sonner';

export function useVault() {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  // Create a new vault entry with encrypted data
  const createVaultEntry = async (
    dataType: number,
    encryptedData: string,
    isPublic: boolean,
    metadataHash: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
        abi: ALMA_CIPHER_VAULT_ABI,
        functionName: 'createVaultEntry',
        args: [
          BigInt(dataType),
          BigInt(encryptedData),
          isPublic,
          metadataHash
        ],
      });
      
      toast.success('Vault entry created successfully');
      return hash;
    } catch (err) {
      console.error('Error creating vault entry:', err);
      toast.error('Failed to create vault entry');
      throw err;
    }
  };

  // Update an existing vault entry
  const updateVaultEntry = async (
    entryId: number,
    newEncryptedData: string,
    isPublic: boolean,
    metadataHash: string
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
        abi: ALMA_CIPHER_VAULT_ABI,
        functionName: 'updateVaultEntry',
        args: [
          BigInt(entryId),
          BigInt(newEncryptedData),
          isPublic,
          metadataHash
        ],
      });
      
      toast.success('Vault entry updated successfully');
      return hash;
    } catch (err) {
      console.error('Error updating vault entry:', err);
      toast.error('Failed to update vault entry');
      throw err;
    }
  };

  // Grant access to a user
  const grantAccess = async (
    userAddress: string,
    entryId: number,
    permissionLevel: number,
    duration: number
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
        abi: ALMA_CIPHER_VAULT_ABI,
        functionName: 'grantAccess',
        args: [
          userAddress as `0x${string}`,
          BigInt(entryId),
          BigInt(permissionLevel),
          BigInt(duration)
        ],
      });
      
      toast.success('Access granted successfully');
      return hash;
    } catch (err) {
      console.error('Error granting access:', err);
      toast.error('Failed to grant access');
      throw err;
    }
  };

  // Revoke access from a user
  const revokeAccess = async (userAddress: string, entryId: number) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
        abi: ALMA_CIPHER_VAULT_ABI,
        functionName: 'revokeAccess',
        args: [userAddress as `0x${string}`, BigInt(entryId)],
      });
      
      toast.success('Access revoked successfully');
      return hash;
    } catch (err) {
      console.error('Error revoking access:', err);
      toast.error('Failed to revoke access');
      throw err;
    }
  };

  return {
    createVaultEntry,
    updateVaultEntry,
    grantAccess,
    revokeAccess,
    isPending,
    error,
  };
}

// Hook for reading vault data
export function useVaultData(entryId?: number) {
  const { data: vaultEntry, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
    abi: ALMA_CIPHER_VAULT_ABI,
    functionName: 'getVaultEntryInfo',
    args: entryId ? [BigInt(entryId)] : undefined,
    query: {
      enabled: !!entryId,
    },
  });

  return {
    vaultEntry,
    isLoading,
    error,
  };
}

// Hook for user reputation
export function useUserReputation(userAddress?: string) {
  const { data: reputation, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
    abi: ALMA_CIPHER_VAULT_ABI,
    functionName: 'getUserReputation',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    reputation: reputation ? Number(reputation) : 0,
    isLoading,
    error,
  };
}

// Hook for user permissions
export function useUserPermissions(userAddress?: string) {
  const { data: permissions, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESSES.ALMA_CIPHER_VAULT,
    abi: ALMA_CIPHER_VAULT_ABI,
    functionName: 'getUserPermissions',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    permissions: permissions ? Number(permissions) : 0,
    isLoading,
    error,
  };
}