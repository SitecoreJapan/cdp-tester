export function saveJson(key, json) {
    window.localStorage.setItem(key, JSON.stringify(json));
}

export function loadJson(key) {
    let jsonString = window.localStorage.getItem(key);
    let json = JSON.parse(jsonString);
    return json;
}