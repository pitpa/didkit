import init, {
  keyToDID,
  pubkeyToDID,
  keyToVerificationMethod,
  verifyCredential,
  generateCredentialDataToSign,
  finalizeCredential,
  didToVerificationMethod,
} from "./pkg/web/didkit_wasm.js";
​
const secp = window.nobleSecp256k1;
​
(async () => {
  await init();
​
  const tokenRes = await fetch("https://api.mahola.xyz/api/v1/auth/token", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      authPassword: {
        loginId: "demo_custody_user",
        password: "6gfagbyz",
      },
    }),
  });
  const { accessToken, refreshToken, expiresIn } = await tokenRes.json();
  console.log(`accessToken: ${accessToken}`)
​
  const addressRes = await fetch("https://api.mahola.xyz/api/v1/users/me/addresses", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { addresses } = await addressRes.json();
  const addressId = addresses[0].id;
  const publicKey = addresses[0].publicKey;
  const address = addresses[0].address;
  console.log(`addressId: ${addressId}`)
​
  const did = pubkeyToDID("key", publicKey); // Unable to filter proofs: signature error
  // const did = `did:pkh:eip155:1:${address}` // Unable to resolve key for JWS: JWT key not found
  console.log(`did: ${did}`)
  const verificationMethod = await didToVerificationMethod(did);
  console.log(`verificationMethod: ${verificationMethod}`)
​
  const vc = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc/status-list/2021/v1",
      "https://schema.sakazuki.xyz/credentials/v1.0.jsonld"
    ],
    "id": "urn:uuid:b14a66b2-c8d9-4d0e-9c98-63053d1f23e3",
    "type": [
      "VerifiableCredential",
      "EducationalCredential"
    ],
    "credentialSubject": {
      "id": "did:pkh:eip155:1:0xB1E26E659193AA8Cfa18d59DC5033Ad78dahoge2",
      "degree": {
        "dateEarned": "2022-11-21T00:00:00.000Z",
        "degreeOf": "Bachelor of engineering",
        "departmentOf": "Department of Design",
        "id": "00001"
      },
      "type": "EducationalCredentialSubject",
      "name": "hoge"
    },
    "issuer": did,
    "issuanceDate": "2022-11-21T00:00:00Z",
    "credentialStatus": {
      "id": "https://localhost:3001/api/credential-status-lists/ty8h25n1mt4r1ei52ydk94gl#1",
      "type": "StatusList2021Entry",
      "statusListIndex": 1,
      "statusListCredential": "https://localhost:3001/api/credential-status-lists/ty8h25n1mt4r1ei52ydk94gl",
      "statusPurpose": "revocation"
    },
    "credentialSchema": {
      "id": "https://schema.sakazuki.xyz/credentials/edu/v1.0.json",
      "type": "JsonSchemaValidator2018"
    },
    "description": "upon the recommendation of the graduate school of engineering hereby confers",
    "name": "EXAMPLE INSTITUTE OF TECHNOLOGY"
  };
​
  const proof = {
    proofPurpose: "assertionMethod",
    proofFormat: "jwt",
    verificationMethod: verificationMethod,
  }
​
  const signing_data = generateCredentialDataToSign(
    JSON.stringify(vc),
    JSON.stringify(proof),
    "ES256K",
    verificationMethod
  );
  console.log(`Signing data: ${signing_data}`)
​
  const sigHash = await secp.utils.sha256(new TextEncoder().encode(signing_data));
  const sigHashString = Array.from(sigHash).map(b => b.toString(16).padStart(2, '0')).join('');
  console.log(`SigHash: ${sigHashString}`)
  const signRes = await fetch(`https://api.mahola.xyz/api/v1/users/me/addresses/${addressId}:blind_sign`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message: sigHashString, // ここの形式はあってる？
    }),
  });
  const { signature } = await signRes.json();
​
  // const der_signature = await secp.sign(sigHash, privKey);
  // const signature = await secp.Signature.fromDER(der_signature).toCompactHex();
  // console.log(`signature: ${signature}`)
  console.log(`signature: ${signature}`)
​
  const signedVc = finalizeCredential(signing_data, signature);
  console.log(`Credential: ${signedVc}`)
​
  const verifyStr = await verifyCredential(
    signedVc,
    JSON.stringify({
      proofPurpose: "assertionMethod",
      proofFormat: "jwt",
    })
  );
  console.log(`Verify: ${verifyStr}`)
​
  const verify = JSON.parse(verifyStr);
​
  if (verify.errors.length > 0) throw verify.errors;
})();
