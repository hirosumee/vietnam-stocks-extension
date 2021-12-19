export async function appendToArray(k, v, uniqueKey) {
  let oldVal = await get(k);
  if (oldVal === null || oldVal === undefined) {
    oldVal = [];
  }
  if (Array.isArray(oldVal)) {
    if (uniqueKey) {
      const i = oldVal.findIndex((val) => val[uniqueKey] === v[uniqueKey]);
      if (i !== -1) {
        const clone = [...oldVal];
        clone[i] = { ...clone[i], ...v };
        return set(k, clone);
      }
    }
    return set(k, [...oldVal, v]);
  }
  return Promise.reject('can not append');
}

export function set(k, v) {
  return new Promise((resolve) => {
    console.log(k, v);
    chrome.storage.local.set({ [k]: v }, function () {
      console.log('Value is set to ', v);
      resolve();
    });
  });
}
export function get(k) {
  return new Promise((resolve) => {
    chrome.storage.local.get([k], function (result) {
      console.log('Value currently is ', result[k]);
      resolve(result[k]);
    });
  });
}

export function watchChanges(keyArea, key, cb) {
  const fn = (changes, area) => {
    if (area === keyArea && changes[key]) {
      cb(changes[key]);
    }
  };
  chrome.storage.onChanged.addListener(fn);
  return () => chrome.storage.onChanged.removeListener(fn);
}

export async function deleteFromArray(key, keyVal, uniqueKeyVal) {
  let oldVal = await get(key);
  if (oldVal === null || oldVal === undefined) {
    oldVal = [];
  }
  if (Array.isArray(oldVal)) {
    const v = oldVal.filter((v) => v[uniqueKeyVal] !== keyVal);
    return set(key, v);
  }
  return Promise.reject('can not delete');
}
