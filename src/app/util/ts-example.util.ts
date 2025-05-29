// This util file is unused,
// it's here an example of how I generally use Typescript in projects

declare type primitive = string | boolean | number | null | undefined;
declare type nullish = null | undefined;

const nonPrimitiveTypes = ["object", "function"];

export function isNullish(val: any): boolean {
  return val == null;
}

export function isPrimitive(val: any): boolean {
  return isNullish(val) || !nonPrimitiveTypes.includes(typeof val);
}

/**
 * All examples below are my attempts to
 * allow serialization purely based on object data and key-based function not class
 * it works well, but not perfect.
 */
declare type DtoOf<T extends Record<string, Exclude<any, Function>>> = {
  [key in keyof T]: T[key] | ((...args: any[]) => T[key]);
};

export type BaseRecordType<V = any> = Record<string, V>;

export type BaseClassType<T extends Function = any> = new (...args: any[]) => T;

export type RecordOrClass = BaseRecordType | BaseClassType;

// I used 'structuredClone' instead of JSON.parse(JSON.stringify())
export function deepClone<T extends BaseRecordType>(obj: T): T {
  return structuredClone(obj);
}

// This function except both values and functions like class serialization
function deriveProcessedValue<T extends BaseRecordType>(v: any, record: T) {
  if (isPrimitive(v) || v instanceof Date) return v;
  if (typeof v === "function") return v(v, record);
  return deepClone(v);
}

export function cloneAndSync<T extends BaseRecordType>(obj: T) {
  return Object.keys(obj).reduce((acc, cur) => {
    const currentValue = obj[cur];
    return {
      ...acc,
      [cur]: deriveProcessedValue(currentValue, obj),
    };
  }, {}) as {
    [key in keyof T]: T[key] extends Function
      ? Exclude<ReturnType<T[key]>, Function>
      : Exclude<T[key], Function>;
  };
}

export function syncKeyValues<T extends BaseRecordType, U extends T>(
  toObj: T,
  fromObj: DtoOf<U>,
  specifiedKeys?: (keyof T)[]
): void {
  const keysToSync = specifiedKeys || Object.keys(toObj);
  const keysToSyncMap = keysToSync.reduce((acc, cur) => {
    const fromObjValue = fromObj[cur];
    return {
      ...acc,
      [cur]: deriveProcessedValue(fromObjValue, fromObj),
    };
  }, {});
  Object.assign(toObj, keysToSyncMap);
}

export function resetAllKeysTo<T extends BaseRecordType>(
  obj: T,
  toVal: primitive
): void {
  const keyMap = Object.keys(obj).reduce((acc, cur) => {
    return { [cur]: toVal, ...acc };
  }, {});
  Object.assign(obj, keyMap);
}
