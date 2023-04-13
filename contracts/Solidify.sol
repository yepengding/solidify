// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Solidify is ERC721, AccessControl {
    // Roles
    bytes32 public constant RECORDER_ROLE = keccak256("RECORDER_ROLE");

    // Record structure
    struct Record {
        uint256 id;
        string content;
        uint256 createdAt;
        uint256 updatedAt;
        bool isErased;
    }

    // Record mapping: ID -> Record
    mapping(uint256 => Record) private records;

    // Ownership mapping: ID -> Owner address
    mapping(uint256 => address) private recordOwners;

    // Events
    event RecordCreated(uint256 indexed id, string content, uint256 createdAt);
    event RecordUpdated(uint256 indexed id, string content, uint256 updatedAt);
    event RecordErased(uint256 indexed id, uint256 erasedAt);
    event RecordNFTIssued(
        uint256 indexed id,
        address indexed to,
        uint256 issuedAt
    );

    /**
     * Constructor
     *
     * Grant DEFAULT_ADMIN_ROLE and RECORDER_ROLE to the deployer
     */
    constructor() ERC721("Solidify", "SDY") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(RECORDER_ROLE, msg.sender);
    }

    /**
     * Create an existing record
     *
     * @param _id record ID
     * @param _content content
     */
    function create(
        uint256 _id,
        string calldata _content
    ) external onlyRole(RECORDER_ROLE) {
        require(records[_id].createdAt == 0, "Record ID is duplicated.");

        records[_id] = Record(
            _id,
            _content,
            block.timestamp,
            block.timestamp,
            false
        );

        emit RecordCreated(_id, _content, block.timestamp);
    }

    /**
     * Retrieve a record
     *
     * @param _id record ID
     * @return record ID
     * @return content
     * @return createdAt
     * @return UpdatedAt
     * @return isErased
     * @return owner address
     */
    function retrieve(
        uint256 _id
    ) external view returns (uint256, string memory, uint256, uint256, bool, address) {
        Record storage record = records[_id];
        require(record.createdAt != 0, "Record is not found.");

        return (
            record.id,
            record.content,
            record.createdAt,
            record.updatedAt,
            record.isErased,
            recordOwners[_id]
        );
    }

    /**
     * Update an existing record
     *
     * @param _id record ID
     * @param _content updated content
     */
    function update(
        uint256 _id,
        string calldata _content
    ) external onlyRole(RECORDER_ROLE) {
        Record storage record = records[_id];
        require(record.createdAt != 0, "Record is not found.");

        record.content = _content;
        record.updatedAt = block.timestamp;

        emit RecordUpdated(_id, _content, block.timestamp);
    }

    /**
     * Erase an existing record
     * @param _id ID
     */
    function erase(uint256 _id) external onlyRole(RECORDER_ROLE) {
        Record storage record = records[_id];
        require(record.createdAt != 0, "Record is not found.");
        require(record.isErased == false, "Record has been erased.");
        require(recordOwners[_id] == address(0), "Record NFT has been issued.");

        record.isErased = true;
        record.updatedAt = block.timestamp;

        emit RecordErased(_id, block.timestamp);
    }

    /**
     * Issue NFT for a record to a recipient
     *
     * @param _id Record ID
     * @param _to recipient
     */
    function issueNFT(
        uint256 _id,
        address _to
    ) external onlyRole(RECORDER_ROLE) {
        Record storage record = records[_id];
        require(record.createdAt != 0, "Record is not found.");
        require(record.isErased == false, "Record has been erased.");
        require(recordOwners[_id] == address(0), "Record NFT has been issued.");

        _safeMint(_to, _id);
        recordOwners[_id] = _to;

        emit RecordNFTIssued(_id, _to, block.timestamp);
    }

    /**
     * Define base URI for NFTs
     */
    function _baseURI() internal pure override returns (string memory) {
        return "https://github.com/yepengding/solidify/nft/";
    }

    /**
     * Resolve function name conflicts
     *
     * @param interfaceId interface ID
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
