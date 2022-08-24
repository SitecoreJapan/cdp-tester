import {getDomain} from "../util/SettingUtil";
import {saveJson, loadJson} from "../util/StorageUtil";
export const STORAGE_KEY_TRACK_SETTING = "tracking_setting";

let initValue = {
    client_key: "",
    target: "https://api.boxever.com/v1.2",
    cookie_domain: getDomain(),
    javascriptLibraryVersion: "1.4.9",
    pointOfSale: "",
    web_flow_target: "https://d35vb5cccm4xzp.cloudfront.net",
    web_flow_config: {async: true, defer: true}
};
let savedTrackingSetting = loadJson(STORAGE_KEY_TRACK_SETTING);
if(savedTrackingSetting) {
    initValue = {...initValue,...savedTrackingSetting};
}

export const appSettingInitialState = {...initValue};

export function appSettingReducer(state, action) {
    console.log("=== debug ===");
    console.log(JSON.stringify(action));
    console.log("=== previous state ===");
    console.log(JSON.stringify(state));

    // init newState by previous state
    let newState = {...state};

    if(action.type === "trackingSetting" || action.type === "pointOfSale") {
        // settings related to _boxever_settings
        newState = {...newState, ...action.payload};
    }

    saveJson(STORAGE_KEY_TRACK_SETTING, newState);
    console.log("=== new state ===");
    console.log(JSON.stringify(newState));
    return newState;
}