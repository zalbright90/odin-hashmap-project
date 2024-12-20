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

    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let pair of this.buckets[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        this.buckets[index].push([key, value]);
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
        return null;
    }
    has(key) {
        const index = this.hash(key);
        
        try {
            const bucket = accessBucket(index, this.buckets);
            if (!bucket) return false;

            for (const [storedKey] of bucket) {
                if (storedKey === key) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error accessing bucket:", error.message);
            return false;
        }
    }

    remove(key) {
        const index = this.hash(key);

        try {
            const bucket = accessBucket(index, this.buckets);
            if (!bucket) return false;

            for (let i = 0; i < bucket.length; i++) {
                const [storedKey, storedValue] = bucket[i];
                if (storedKey === key) {
                    bucket.splice(i, 1);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error accessing bucket:", error.message);
            return false;
        }
    }

    length() {
        let count = 0;

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if (bucket) {
                count += bucket.length;
            }
        }
        return count;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    keys() {
        const keysArray = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if(bucket) {
                for (let [key] of bucket) {
                    keysArray.push(key);
                }
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let [, value] of bucket) {
                    valuesArray.push(value);
                }
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let [key, value] of bucket) {
                    entriesArray.push([key, value]);
                }
            }
        }
        return entriesArray;
    }
}

