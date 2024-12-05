import { djb2_hash } from './hash.js';
import { accessBucket } from './utils.js';

export class HashSet {
    constructor(capacity = 16) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.loadFactor = 0.75;
        this.size = 0;
    }

    hash(key) {
        return djb2_hash(key, this.capacity);
    }

    set(key) {
        const index = this.hash(key);
        accessBucket(index, this.buckets);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        if (!this.buckets[index].some(entry => entry === key)) {
            this.buckets[index].push(key);
            this.size++;
        }

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    has(key) {
        const index = this.hash(key);
        accessBucket(index, this.buckets);

        const bucket = this.buckets[index];
        if (bucket) {
            return bucket.includes(key);
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        accessBucket(index, this.buckets);

        const bucket = this.buckets[index];
        if (bucket) {
            const keyIndex = bucket.indexOf(key);
            if (keyIndex !== -1) {
                bucket.splice(keyIndex, 1);
                this.size ++;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    keys() {
        let allKeys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                allKeys = allKeys.concat(bucket);
            }
        }
        return allKeys;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity);

        // Rehash all existing keys into the new buckets
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let key of bucket) {
                    const newIndex = djb2_hash(key, newCapacity);
                    if (!newBuckets[newIndex]) {
                        newBuckets[newIndex] = [];
                    }
                    newBuckets[newIndex].push(key);
                }
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }
}