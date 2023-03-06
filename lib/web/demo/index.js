import init, {
  keyToDID,
  pubkeyToDID,
  keyToVerificationMethod,
  verifyCredential,
  generateCredentialDataToSign,
  finalizeCredential,
  didToVerificationMethod,
} from "./pkg/web/didkit_wasm.js";

const secp = window.nobleSecp256k1;

(async () => {
  await init();

  const signedCredentialRaw = {
    "id": "urn:uuid:71fd4f16-17e6-4d18-8ffd-939c38a7088f",
    "name": "EXAMPLE INSTITUTE OF TECHNOLOGY Degree Credential",
    "type": ["VerifiableCredential", "EducationalCredential"],
    "proof": {
      "jws": "eyJhbGciOiJFUzI1NksiLCJjcml0IjpbImI2NCJdLCJiNjQiOmZhbHNlfQ..ii8bqLZuLTyr4_NwYCb1m9_Oc_T_CzNuAk9ZJvoNqUAjen2h1Sr5YqbqEY2v3HmqowU-LfKx_cn1MGqIz2Qmrw",
      "type": "EcdsaSecp256k1Signature2019",
      "created": "2023-03-06T09:37:28.170Z",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:key:zQ3shSViu4ZPTn2BfsfHNJw1V6oqYxZawz2jDW4nK3Dd1bj7v#zQ3shSViu4ZPTn2BfsfHNJw1V6oqYxZawz2jDW4nK3Dd1bj7v"
    },
    "issuer": "did:key:zQ3shSViu4ZPTn2BfsfHNJw1V6oqYxZawz2jDW4nK3Dd1bj7v",
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc/status-list/2021/v1",
      "https://schema.sakazuki.xyz/credentials/v1.0.jsonld"
    ],
    "description": "upon the recommendation of the graduate school of engineering hereby confers\n卒業おめでとうございます",
    "issuanceDate": "2022-11-21T00:00:00Z",
    "credentialSchema": {
      "id": "https://schema.sakazuki.xyz/credentials/edu/v1.0.json",
      "type": "JsonSchemaValidator2018"
    },
    "credentialStatus": {
      "id": "https://localhost:3001/api/credential-status-lists/vovzqimbhdggls7erkc6ohrg#1",
      "type": "StatusList2021Entry",
      "statusPurpose": "revocation",
      "statusListIndex": "1",
      "statusListCredential": "https://localhost:3001/api/credential-status-lists/vovzqimbhdggls7erkc6ohrg"
    },
    "credentialSubject": {
      "id": "did:pkh:eip155:1:0xB1E26E659193AA8Cfa18d59DC5033Ad78dahoge2",
      "name": "hoge太郎2",
      "type": "EducationalCredentialSubject",
      "degree": {
        "id": "No.00001",
        "degreeOf": "Bachelor of engineering",
        "dateEarned": "2022-11-21T00:00:00.000Z",
        "departmentOf": "Department of Design"
      }
    }
  };

  const verifyStr = await verifyCredential(
    JSON.stringify(signedCredentialRaw),
    JSON.stringify({
      proofPurpose: "assertionMethod",
      // verificationMethod: verificationMethod,
      checks: ["credentialStatus"]
    })
  );

  const verify = JSON.parse(verifyStr);
  console.log("verifyの中身確認");
  console.log(verify);
})();
