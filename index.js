const {zkVerifySession, Library, CurveType, ZkVerifyEvents} = require("zkverifyjs");
const fs = require("fs");
const proof = require("./data/proof.json");
const public = require("./data/public.json");
const key = require("./data/main.groth16.vkey.json");

const session = await zkVerifySession.start().Volta().withAccount("seed-phrase")

const {events, regResult} = await session.registerVerificationKey().groth16({library: Library.snarkjs, curve: CurveType.bn128}).execute(key);

events.on(ZkVerifyEvents.Finalized, (eventData) => {
    console.log('Registration finalized:', eventData);
    fs.writeFileSync("vkey.json", JSON.stringify({"hash": eventData.statementHash}, null, 2));
    return eventData.statementHash
});