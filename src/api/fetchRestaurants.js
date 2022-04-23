const fetchRestaurants = async (searchTerm = 'restaurants') => {
    const query = {
        limit: 50,
        location: "Berlin, Germany",
        term: searchTerm,
    }
    const urlParams = new URLSearchParams(query);
    const response = await fetch(`/-/search?${urlParams}`);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body;
};

export default fetchRestaurants;