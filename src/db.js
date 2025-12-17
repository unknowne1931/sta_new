// db.js
import { openDB } from 'idb';

const DB_NAME = 'myDatabase';
const STORE_NAME = 'myStore';
const DB_VERSION = 1;

// Create/open the database with upgrade logic
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  }
});

// Save data
export async function saveToDB(key, value) {
  const db = await dbPromise;
  return await db.put(STORE_NAME, value, key);
}

// Get data
export async function getFromDB(key) {
  const db = await dbPromise;
  return await db.get(STORE_NAME, key);
}

// Remove a single item
export async function removeFromDB(key) {
  const db = await dbPromise;
  return await db.delete(STORE_NAME, key);
}

// Get all keys in the store
export async function getAllKeysFromDB() {
  const db = await dbPromise;
  return await db.getAllKeys(STORE_NAME);
}

// Clear all data from the store
export async function clearStore(storeName = STORE_NAME) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.clear(storeName);
  console.log(`✅ Cleared all data in store "${storeName}"`);
}

// Delete the entire database
export async function deleteDatabase(dbName = DB_NAME) {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(dbName);

    deleteRequest.onsuccess = () => {
      console.log(`✅ Database "${dbName}" deleted successfully`);
      resolve(true);
    };

    deleteRequest.onerror = () => {
      console.error(`❌ Failed to delete DB "${dbName}"`, deleteRequest.error);
      reject(deleteRequest.error);
    };

    deleteRequest.onblocked = () => {
      console.warn(`⚠️ Delete blocked — close all tabs using "${dbName}"`);
    };
  });
}
