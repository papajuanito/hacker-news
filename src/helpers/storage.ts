import { openDB } from 'idb';

const DB_VERSION = 1;
const DB_NAME = 'hacker-news';

export enum DB_STORE {
  ITEM_HISTORY = 'item-history',
}

const getStorage = (name: string = DB_NAME, version: number = DB_VERSION) => {
  return openDB(name, version, {
    upgrade: (db) => {
      db.createObjectStore('item-history');
    },
  });
};

export const hasItem = async (store: DB_STORE, key: string) => {
  const item = await getItem(store, key);
  return !!item;
};

export const getItem = async (store: DB_STORE, key: string) => {
  const db = await getStorage();
  return db.get(store, key);
};

export const storeItem = async (
  store: DB_STORE,
  key: string,
  value: string,
) => {
  const db = await getStorage();
  db.add(store, value, key);
};
