import { djb2_hash } from './hash.js';
import { accessBucket } from './utils.js';

export class HashMap {
    constructor(capacity = 16) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.loadFactor = 0.75;
    }

    hash(key) {
        return djb2_hash(key, this.capacity);
    }

    set(key, value) {
        const index = this.hash(key);
        accessBucket(index, this.buckets);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        this.buckets[index].push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        accessBucket(index, this.buckets);

        const bucket = this.buckets[index];
        if (!bucket) {
            for (let [storedKey, storedValue] of bucket) {
                if (storedKey === key) {
                    return storedValue;
                }
            }
        }
        return undefined;
    }
}

