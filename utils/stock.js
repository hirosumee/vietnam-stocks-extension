import { appendToArray, deleteFromArray, get, watchChanges } from './storage';

const KEY = '__stocks';
export async function saveNewStock(symbol) {
  return appendToArray(KEY, { symbol }, 'symbol');
}
export async function pinStock(symbol) {
  return appendToArray(KEY, { symbol, pinned: true }, 'symbol');
}
export async function unpinStock(symbol) {
  return appendToArray(KEY, { symbol, pinned: false }, 'symbol');
}

export async function getSavedStocks() {
  return get(KEY).then((v) => {
    if (Array.isArray(v)) {
      return v;
    }
    return [];
  });
}

export function watchSavedStocksChange(cb) {
  return watchChanges('local', KEY, (v) => {
    if (Array.isArray(v.newValue)) {
      cb(v.newValue);
    }
  });
}

export function deleteStock(symbol) {
  return deleteFromArray(KEY, symbol, 'symbol');
}
