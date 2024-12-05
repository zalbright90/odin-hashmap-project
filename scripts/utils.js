export function accessBucket(index, buckets) {
    if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
    }
    return buckets[index];
}