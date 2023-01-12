const localStorageGetItem = (key, type) => {
    const item = localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }
    else {
        switch (type) {
            case "object": {
                return {};
            }
            case "array": {
                return [];
            }
            default: {
                return null;
            }
        }
    }
}

const localStorageSetItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const localStorageSetItemProperty = (key, property, value) => {
    const item = localStorage.getItem(key);
    if (!item)
        return;
    const auth = JSON.parse(item);
    auth[property] = value;
    localStorage.setItem(key, JSON.stringify(auth));
}

export { localStorageGetItem, localStorageSetItem, localStorageSetItemProperty };