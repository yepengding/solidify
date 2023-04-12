// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Solidify is AccessControl {
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

    // Record mapping
    mapping(uint256 => Record) private records;

    // Events
    event RecordCreated(uint256 indexed id, string content, uint256 createdAt);
    event RecordUpdated(uint256 indexed id, string content, uint256 updatedAt);
    event RecordErased(uint256 indexed id, uint256 erasedAt);

    /**
     * Constructor
     *
     * Grant DEFAULT_ADMIN_ROLE and RECORDER_ROLE to the deployer
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(RECORDER_ROLE, msg.sender);
    }

    /**
     * Create an existing record
     *
     * @param _id ID
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
     * @param _id ID
     * @return ID
     * @return content
     * @return createdAt
     * @return UpdatedAt
     * @return isErased
     */
    function retrieve(
        uint256 _id
    ) external view returns (uint256, string memory, uint256, uint256, bool) {
        Record storage record = records[_id];
        require(record.createdAt != 0, "Record is not found.");

        return (
            record.id,
            record.content,
            record.createdAt,
            record.updatedAt,
            record.isErased
        );
    }

    /**
     * Update an existing record
     *
     * @param _id ID
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
        require(record.isErased == false, "Certificate was erased.");

        record.isErased = true;
        record.updatedAt = block.timestamp;

        emit RecordErased(_id, block.timestamp);
    }
}
