export function djb2_hash(key, bucketsLength) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) + hash + key.charCodeAt(i)) % bucketsLength;
    }
    return hash;
}