import type { IStorage } from "src/types";

chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log("content", count);
});
