// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint64, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

/**
 * @title AlmaCipherVault
 * @dev A secure vault contract using Fully Homomorphic Encryption (FHE)
 * for confidential data management and blockchain integration
 */
contract AlmaCipherVault {
    
    // Data structure for encrypted vault entries
    struct VaultEntry {
        euint32 entryId;
        euint32 dataType; // 1: Document, 2: Financial, 3: Media, 4: Personal
        euint32 encryptedData; // Encrypted data value
        ebool isActive;
        ebool isPublic;
        string metadataHash; // IPFS hash for metadata
        address owner;
        uint256 timestamp;
        uint256 lastModified;
    }
    
    // Access control structure
    struct AccessControl {
        euint32 permissionLevel; // 1: Read, 2: Write, 3: Admin
        ebool hasAccess;
        uint256 expiryTime;
    }
    
    // Audit trail structure
    struct AuditLog {
        euint32 logId;
        euint32 entryId;
        euint32 actionType; // 1: Create, 2: Read, 3: Update, 4: Delete
        address actor;
        uint256 timestamp;
        string description;
    }
    
    // State variables
    mapping(uint256 => VaultEntry) public vaultEntries;
    mapping(address => mapping(uint256 => AccessControl)) public accessControls;
    mapping(uint256 => AuditLog) public auditLogs;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userPermissions;
    
    uint256 public entryCounter;
    uint256 public logCounter;
    
    address public owner;
    address public verifier;
    
    // Events
    event VaultEntryCreated(uint256 indexed entryId, address indexed owner, uint32 dataType);
    event VaultEntryUpdated(uint256 indexed entryId, address indexed updater);
    event AccessGranted(address indexed user, uint256 indexed entryId, uint32 permissionLevel);
    event AccessRevoked(address indexed user, uint256 indexed entryId);
    event AuditLogCreated(uint256 indexed logId, uint256 indexed entryId, address indexed actor);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event DataEncrypted(uint256 indexed entryId, uint32 encryptedValue);
    event DataDecrypted(uint256 indexed entryId, address indexed requester);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier hasAccess(uint256 entryId, uint32 requiredPermission) {
        require(
            FHE.decrypt(accessControls[msg.sender][entryId].hasAccess) &&
            FHE.decrypt(accessControls[msg.sender][entryId].permissionLevel) >= requiredPermission &&
            block.timestamp <= accessControls[msg.sender][entryId].expiryTime,
            "Access denied"
        );
        _;
    }
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    /**
     * @dev Create a new vault entry with encrypted data
     * @param dataType Type of data being stored
     * @param encryptedData Encrypted data value
     * @param isPublic Whether the entry is publicly accessible
     * @param metadataHash IPFS hash for metadata
     */
    function createVaultEntry(
        euint32 dataType,
        euint32 encryptedData,
        ebool isPublic,
        string memory metadataHash
    ) public returns (uint256) {
        require(bytes(metadataHash).length > 0, "Metadata hash cannot be empty");
        
        uint256 entryId = entryCounter++;
        
        vaultEntries[entryId] = VaultEntry({
            entryId: encryptedData, // Will be set properly
            dataType: dataType,
            encryptedData: encryptedData,
            isActive: FHE.asEbool(true),
            isPublic: isPublic,
            metadataHash: metadataHash,
            owner: msg.sender,
            timestamp: block.timestamp,
            lastModified: block.timestamp
        });
        
        // Grant owner full access
        accessControls[msg.sender][entryId] = AccessControl({
            permissionLevel: FHE.asEuint32(3), // Admin level
            hasAccess: FHE.asEbool(true),
            expiryTime: block.timestamp + 365 days
        });
        
        // Create audit log
        _createAuditLog(entryId, FHE.asEuint32(1), msg.sender, "Entry created");
        
        emit VaultEntryCreated(entryId, msg.sender, FHE.decrypt(dataType));
        emit DataEncrypted(entryId, FHE.decrypt(encryptedData));
        return entryId;
    }
    
    /**
     * @dev Update an existing vault entry
     * @param entryId ID of the entry to update
     * @param newEncryptedData New encrypted data
     * @param newIsPublic New public status
     * @param newMetadataHash New metadata hash
     */
    function updateVaultEntry(
        uint256 entryId,
        euint32 newEncryptedData,
        ebool newIsPublic,
        string memory newMetadataHash
    ) public hasAccess(entryId, 2) {
        require(vaultEntries[entryId].owner != address(0), "Entry does not exist");
        require(FHE.decrypt(vaultEntries[entryId].isActive), "Entry is not active");
        
        vaultEntries[entryId].encryptedData = newEncryptedData;
        vaultEntries[entryId].isPublic = newIsPublic;
        vaultEntries[entryId].metadataHash = newMetadataHash;
        vaultEntries[entryId].lastModified = block.timestamp;
        
        _createAuditLog(entryId, FHE.asEuint32(3), msg.sender, "Entry updated");
        
        emit VaultEntryUpdated(entryId, msg.sender);
        emit DataEncrypted(entryId, FHE.decrypt(newEncryptedData));
    }
    
    /**
     * @dev Grant access to a user for a specific entry
     * @param user Address of the user to grant access
     * @param entryId ID of the entry
     * @param permissionLevel Level of permission (1: Read, 2: Write, 3: Admin)
     * @param duration Duration of access in seconds
     */
    function grantAccess(
        address user,
        uint256 entryId,
        euint32 permissionLevel,
        uint256 duration
    ) public hasAccess(entryId, 3) {
        require(user != address(0), "Invalid user address");
        require(duration > 0, "Duration must be positive");
        
        accessControls[user][entryId] = AccessControl({
            permissionLevel: permissionLevel,
            hasAccess: FHE.asEbool(true),
            expiryTime: block.timestamp + duration
        });
        
        emit AccessGranted(user, entryId, FHE.decrypt(permissionLevel));
    }
    
    /**
     * @dev Revoke access from a user for a specific entry
     * @param user Address of the user to revoke access
     * @param entryId ID of the entry
     */
    function revokeAccess(
        address user,
        uint256 entryId
    ) public hasAccess(entryId, 3) {
        accessControls[user][entryId].hasAccess = FHE.asEbool(false);
        
        emit AccessRevoked(user, entryId);
    }
    
    /**
     * @dev Update user reputation
     * @param user Address of the user
     * @param reputation New reputation score
     */
    function updateReputation(
        address user,
        euint32 reputation
    ) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        
        emit ReputationUpdated(user, FHE.decrypt(reputation));
    }
    
    /**
     * @dev Update user permissions
     * @param user Address of the user
     * @param permissions New permission level
     */
    function updateUserPermissions(
        address user,
        euint32 permissions
    ) public onlyOwner {
        require(user != address(0), "Invalid user address");
        
        userPermissions[user] = permissions;
    }
    
    /**
     * @dev Get vault entry information (decrypted for authorized users)
     * @param entryId ID of the entry
     */
    function getVaultEntryInfo(uint256 entryId) public view returns (
        uint32 dataType,
        uint32 encryptedData,
        bool isActive,
        bool isPublic,
        string memory metadataHash,
        address owner,
        uint256 timestamp,
        uint256 lastModified
    ) {
        VaultEntry storage entry = vaultEntries[entryId];
        require(entry.owner != address(0), "Entry does not exist");
        
        // Check if user has access or entry is public
        require(
            FHE.decrypt(accessControls[msg.sender][entryId].hasAccess) ||
            FHE.decrypt(entry.isPublic),
            "Access denied"
        );
        
        emit DataDecrypted(entryId, msg.sender);
        
        return (
            FHE.decrypt(entry.dataType),
            FHE.decrypt(entry.encryptedData),
            FHE.decrypt(entry.isActive),
            FHE.decrypt(entry.isPublic),
            entry.metadataHash,
            entry.owner,
            entry.timestamp,
            entry.lastModified
        );
    }
    
    /**
     * @dev Get user reputation
     * @param user Address of the user
     */
    function getUserReputation(address user) public view returns (uint32) {
        return FHE.decrypt(userReputation[user]);
    }
    
    /**
     * @dev Get user permissions
     * @param user Address of the user
     */
    function getUserPermissions(address user) public view returns (uint32) {
        return FHE.decrypt(userPermissions[user]);
    }
    
    /**
     * @dev Internal function to create audit logs
     */
    function _createAuditLog(
        uint256 entryId,
        euint32 actionType,
        address actor,
        string memory description
    ) internal {
        uint256 logId = logCounter++;
        
        auditLogs[logId] = AuditLog({
            logId: actionType, // Will be set properly
            entryId: FHE.asEuint32(entryId),
            actionType: actionType,
            actor: actor,
            timestamp: block.timestamp,
            description: description
        });
        
        emit AuditLogCreated(logId, entryId, actor);
    }
    
    /**
     * @dev Emergency function to deactivate an entry
     * @param entryId ID of the entry to deactivate
     */
    function deactivateEntry(uint256 entryId) public onlyOwner {
        require(vaultEntries[entryId].owner != address(0), "Entry does not exist");
        
        vaultEntries[entryId].isActive = FHE.asEbool(false);
        
        _createAuditLog(entryId, FHE.asEuint32(4), msg.sender, "Entry deactivated by owner");
    }
    
    /**
     * @dev Transfer ownership of an entry
     * @param entryId ID of the entry
     * @param newOwner Address of the new owner
     */
    function transferEntryOwnership(
        uint256 entryId,
        address newOwner
    ) public {
        require(vaultEntries[entryId].owner == msg.sender, "Only owner can transfer");
        require(newOwner != address(0), "Invalid new owner");
        
        vaultEntries[entryId].owner = newOwner;
        
        // Revoke old owner's access
        accessControls[msg.sender][entryId].hasAccess = FHE.asEbool(false);
        
        // Grant new owner full access
        accessControls[newOwner][entryId] = AccessControl({
            permissionLevel: FHE.asEuint32(3),
            hasAccess: FHE.asEbool(true),
            expiryTime: block.timestamp + 365 days
        });
        
        _createAuditLog(entryId, FHE.asEuint32(3), msg.sender, "Ownership transferred");
    }
}