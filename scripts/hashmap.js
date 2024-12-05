import { djb2_hash } from './hash.js';
import { accessBucket } from './utils.js';

export class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        return djb2_hash(key, this.capacity);
    }

    resize() {
        const newBuckets = new Array(this.capacity * 2);
        this.capacity *= 2;
        this.size = 0;

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value, newBuckets);
                }
            }
        }

        this.buckets = newBuckets;
    }

    set(key, value, customBuckets = this.buckets) {
        const index = this.hash(key);
        const bucket = customBuckets[index];

        if (!bucket) {
            customBuckets[index] = [[key, value]];
            this.size++;
        } else {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket[i][1] === value;
                    return;
                }
            }
            bucket.push([key, value]);
            this.size++;
        }

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = accessBucket(index, this.buckets);

        if (bucket) {
            for (let [storedKey, storedValue] of bucket) {
                if (storedKey === key) {
                    return storedValue;
                }
            }
        }
        return undefined;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
}

