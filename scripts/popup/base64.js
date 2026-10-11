// Shared base64 encoding for the backup and preset codes the popup gives

// Converts text to base64 through UTF-8
export function encodeBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
}

// Converts base64 to text through UTF-8
export function decodeBase64(code) {
    const bytes = Uint8Array.from(atob(code), (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

// Removes every space and line break a code picked up from being copied before it gets decoded
export function cleanCode(code) {
    return String(code).replace(/\s+/g, "");
}