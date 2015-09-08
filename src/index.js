import { keyed } from "./constants";

export default function () {
    let globalNamespace;
    if (typeof global === "object") {
        globalNamespace = global; //eslint-disable-line no-undef
    } else {
        globalNamespace = window; //eslint-disable-line no-undef
    }

    globalNamespace.Object.prototype[keyed] = function () {
        const self = this;
        return {
            get: (key) => this[key],
            has: (key) => this.hasOwnProperty(key),
            set: (key, value) => ({...this, [key]: value}),
            remove: (key) => {
                const dest = {};
                for (let k in this) {
                    if (k !== key) {
                        dest[k] = this[k];
                    }
                }
                return dest;
            },
            entries: function* () {
                for (let k in self) {
                    yield [k, self[k]];
                }
            }
        };
    };

    globalNamespace.Map.prototype[keyed] = function () {
        return {
            get: (key) => this.get(key),
            has: (key) => this.has(key),
            set: (key, value) => new globalNamespace.Map(this).set(key,value),
            remove: (key) => {
                const nextMap = new globalNamespace.Map(this);
                nextMap.delete(key);
                return nextMap;
            },
            entries: () => this.entries()
        };
    };
}