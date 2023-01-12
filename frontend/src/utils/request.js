import { REQUEST_CONTENT_TYPE } from "../constants/request";

const get = async (uri) => {
    const requestInit = {
        method: 'GET'
    }

    return await fetch(uri, requestInit);
}

const post = async (uri, data) => {
    const requestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return await fetch(uri, requestInit);
}

const put = async (uri, data, contentType = REQUEST_CONTENT_TYPE.JSON) => {
    const requestInit = {
        method: 'PUT'
    }

    if (contentType === REQUEST_CONTENT_TYPE.JSON) {
        requestInit.headers = {
            'Content-Type': 'application/json'
        }
        requestInit.body = JSON.stringify(data);
    }
    else {
        requestInit.body = data;
    }

    return await fetch(uri, requestInit);
}

export { get, post, put };