const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bufToB64(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function b64ToBuf(value: string) {
  const bin = atob(value);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function keyFromPassphrase(passphrase: string) {
  const material = await crypto.subtle.importKey("raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: encoder.encode("emergent-os-sealed-channel"), iterations: 120000, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

export async function seal(plain: string, passphrase: string) {
  const key = await keyFromPassphrase(passphrase);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(plain));
  return { cipher: bufToB64(cipher), iv: bufToB64(iv.buffer) };
}

export async function unseal(cipher: string, iv: string, passphrase: string) {
  const key = await keyFromPassphrase(passphrase);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(b64ToBuf(iv)) }, key, b64ToBuf(cipher));
  return decoder.decode(plain);
}
