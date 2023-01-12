const checkSearchParams = (searchParams, param, values) => {
    const searchedParam = searchParams.get(param);

    if (searchedParam)
        return values.includes(searchedParam);
    return false;
}

const getSearchParam = (searchParams, param, values, defaultValue) => {
    if (checkSearchParams(searchParams, param, values)) {
        return searchParams.get(param);
    }
    else {
        return defaultValue;
    }
}

export { checkSearchParams, getSearchParam }