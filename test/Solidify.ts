import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Solidify", () => {

    const ROLES = {
        DEFAULT_ADMIN: ethers.constants.HashZero,
        RECORDER: ethers.utils.keccak256(ethers.utils.toUtf8Bytes("RECORDER_ROLE"))
    } as const;

    const PAYLOADS = {
        CREATE: [1, "Original content"],
        RETRIEVE: [1],
        UPDATE: [1, "Updated content"],
        ERASE: [1]
    } as const;


    /**
     * Define a deployment fixture.
     * 
     * @returns 
     */
    async function deployedFixture() {
        const [owner, anotherAccount] = await ethers.getSigners();

        const Solidify = await ethers.getContractFactory("Solidify");
        const solidify = await Solidify.deploy();

        return { solidify, owner, anotherAccount };
    }

    async function createdFixture() {
        const [owner, anotherAccount] = await ethers.getSigners();

        const Solidify = await ethers.getContractFactory("Solidify");
        const solidify = await Solidify.deploy();

        await solidify.create(...PAYLOADS.CREATE);

        return { solidify, owner, anotherAccount };
    }

    describe("AccessControl", () => {
        it("Should set the right role admin", async () => {
            const { solidify, owner } = await loadFixture(deployedFixture);

            expect(await solidify.hasRole(ROLES.DEFAULT_ADMIN, owner.address)).to.be.true;
        });

        it("Should grant a recorder role", async () => {
            const { solidify, anotherAccount } = await loadFixture(deployedFixture);
            // Grant recorder role to another account
            await solidify.grantRole(ROLES.RECORDER, anotherAccount.address);

            expect(await solidify.hasRole(ROLES.RECORDER, anotherAccount.address)).to.be.true;
        });

        it("Should revoke a recorder role", async () => {
            const { solidify, anotherAccount } = await loadFixture(deployedFixture);
            await solidify.grantRole(ROLES.RECORDER, anotherAccount.address);
            // Revoke recorder role of another account
            await solidify.revokeRole(ROLES.RECORDER, anotherAccount.address);

            expect(await solidify.hasRole(ROLES.RECORDER, anotherAccount.address)).to.be.false;
        });
    });

    describe("Function", () => {
        describe("Create", () => {
            it("Should emit a RecordCreated event if called from a default admin role", async () => {
                const { solidify } = await loadFixture(deployedFixture);

                await expect(solidify.create(...PAYLOADS.CREATE))
                    .to.emit(solidify, "RecordCreated").withArgs(...PAYLOADS.CREATE, anyValue);
            });
            it("Should emit a RecordCreated event if called from a recorder role", async () => {
                const { solidify, anotherAccount } = await loadFixture(deployedFixture);
                await solidify.grantRole(ROLES.RECORDER, anotherAccount.address);

                await expect(solidify.connect(anotherAccount).create(...PAYLOADS.CREATE))
                    .to.emit(solidify, "RecordCreated").withArgs(...PAYLOADS.CREATE, anyValue);
            });
            it("Should revert with the right error if called from an account without a recorder role", async () => {
                const { solidify, anotherAccount } = await loadFixture(deployedFixture);

                await expect(solidify.connect(anotherAccount).create(...PAYLOADS.CREATE))
                    .to.be.revertedWith(new RegExp(`^AccessControl: account (\\w+) is missing role (\\w+)`));
            });
        });

        describe("Retrieve", () => {
            it("Should retrieve a record", async () => {
                const { solidify } = await loadFixture(createdFixture);

                const record = await solidify.retrieve(...PAYLOADS.RETRIEVE);

                expect(record[0]).to.equal(...PAYLOADS.RETRIEVE);
            });

            it("Should revert with the right error if the record does not exist", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);

                await expect(solidify.retrieve(0))
                    .to.be.revertedWith("Record is not found.");
            });
        });

        describe("Update", () => {
            it("Should emit a RecordUpdated event if called from a default admin role", async () => {
                const { solidify } = await loadFixture(createdFixture);

                await expect(solidify.update(...PAYLOADS.UPDATE))
                    .to.emit(solidify, "RecordUpdated").withArgs(...PAYLOADS.UPDATE, anyValue);
            });
            it("Should emit a RecordUpdated event if called from a recorder role", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);
                await solidify.grantRole(ROLES.RECORDER, anotherAccount.address);

                await expect(solidify.connect(anotherAccount).update(...PAYLOADS.UPDATE))
                    .to.emit(solidify, "RecordUpdated").withArgs(...PAYLOADS.UPDATE, anyValue);
            });
            it("Should revert with the right error if called from an account without a record role", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);

                await expect(solidify.connect(anotherAccount).update(...PAYLOADS.UPDATE))
                    .to.be.revertedWith(new RegExp(`^AccessControl: account (\\w+) is missing role (\\w+)`));
            });
            it("Should revert with the right error if the record does not exist", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);

                await expect(solidify.update(0, ""))
                    .to.be.revertedWith("Record is not found.");
            });
        });

        describe("Erase", () => {
            it("Should emit a RecordErased event if called from a default admin role", async () => {
                const { solidify } = await loadFixture(createdFixture);

                await expect(solidify.erase(...PAYLOADS.ERASE))
                    .to.emit(solidify, "RecordErased").withArgs(...PAYLOADS.ERASE, anyValue);
            });
            it("Should emit a RecordErased event if called from a recorder role", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);
                await solidify.grantRole(ROLES.RECORDER, anotherAccount.address);

                await expect(solidify.connect(anotherAccount).erase(...PAYLOADS.ERASE))
                    .to.emit(solidify, "RecordErased").withArgs(...PAYLOADS.ERASE, anyValue);
            });
            it("Should revert with the right error if called from an account without a record role", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);

                await expect(solidify.connect(anotherAccount).erase(...PAYLOADS.ERASE))
                    .to.be.revertedWith(new RegExp(`^AccessControl: account (\\w+) is missing role (\\w+)`));
            });
            it("Should revert with the right error if the record does not exist", async () => {
                const { solidify, anotherAccount } = await loadFixture(createdFixture);

                await expect(solidify.erase(0))
                    .to.be.revertedWith("Record is not found.");
            });
        });
    });
});
