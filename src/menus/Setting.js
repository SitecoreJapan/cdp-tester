import {useState, useContext} from "react";
import {saveJson, loadJson} from "../util/StorageUtil";
import getAppContext from "../context/AppContext";
import TrackCodeViewer from "../components/TrackCodeViewer";
import {generateJson, generateActivationCode} from "../util/TrackUtil";

export const STORAGE_KEY_TRACK_SETTING = "tracking_setting";
function Setting() {

    const {setting, dispatch} = useContext(getAppContext());
    let initValue = {
        client_key: setting.client_key,
        target: setting.target,
        cookie_domain: setting.cookie_domain,
        javascriptLibraryVersion: setting.javascriptLibraryVersion,
        pointOfSale: setting.pointOfSale,
        web_flow_target: setting.web_flow_target,
        web_flow_config: {...setting.web_flow_config}
    };
    const [trackingSetting, setTrackingSetting] = useState(initValue);

    // code viewer state
    const [codeViewerSetting, setCodeViewerSetting] = useState({
        open: false,
        param: trackingSetting
    });

    return (
        <div className="m-5">
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Tag Setting</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Please your organization's parameter for Streaming API
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Client Key
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="password"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.client_key}
                                        onChange={event => {
                                            let newTrackingSetting = {...trackingSetting, client_key: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Target
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.target}
                                        onChange={event => {
                                            let newTrackingSetting = {...trackingSetting, target: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    >
                                        <option value="https://api.boxever.com/v1.2">Europe</option>
                                        <option value="https://api-ap-southeast-2-production.boxever.com/v1.2">Asia Pacific</option>
                                        <option value="https://api-us.boxever.com/v1.2">United States</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Cookie Domain
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.cookie_domain}
                                        onChange={event => {

                                            let newTrackingSetting = {...trackingSetting, cookie_domain: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Javascript Library Version
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.javascriptLibraryVersion}
                                        onChange={event => {

                                            let newTrackingSetting = {...trackingSetting, javascriptLibraryVersion: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Point of Sale
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.pointOfSale}
                                        onChange={event => {

                                            let newTrackingSetting = {...trackingSetting, pointOfSale: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    <span>Web Flow Target</span><br/>
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        value={trackingSetting.web_flow_target}
                                        onChange={event => {

                                            let newTrackingSetting = {...trackingSetting, web_flow_target: event.target.value};
                                            setTrackingSetting(newTrackingSetting);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                                <div className="pt-6 sm:pt-5">
                                    <div role="group" aria-labelledby="label-email">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                            <div>
                                                <div
                                                    className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                                    id="label-email">
                                                    <span>Web Flow Config</span><br/>
                                                </div>
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                checked={trackingSetting.web_flow_config.async}
                                                                onChange={event => {
                                                                    let newTrackingSetting = {...trackingSetting, web_flow_config: {...trackingSetting.web_flow_config, async: event.target.checked}};
                                                                    setTrackingSetting(newTrackingSetting);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                                async
                                                            </label>
                                                            <p className="text-gray-500">Customize JS loading async attributes</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                    checked={trackingSetting.web_flow_config.defer}
                                                                    onChange={event => {
                                                                        let newTrackingSetting = {...trackingSetting, web_flow_config: {...trackingSetting.web_flow_config, defer: event.target.checked}};
                                                                        setTrackingSetting(newTrackingSetting);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="candidates"
                                                                       className="font-medium text-gray-700">
                                                                    defer
                                                                </label>
                                                                <p className="text-gray-500">Customize JS loading defer attributes</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={event => {
                                // let action = { type: "trackingSetting", payload: {...trackingSetting}};
                                // dispatch(action);
                                console.log(trackingSetting);
                                setCodeViewerSetting({
                                    open: true,
                                    param: trackingSetting
                                });
                            }}
                        >
                            Activation Code
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={event => {
                                saveJson(STORAGE_KEY_TRACK_SETTING, trackingSetting);
                                window.location.reload();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <TrackCodeViewer
                open={codeViewerSetting.open}
                param={codeViewerSetting.param}
                type="activation"
                onClose={(code) => {
                    console.log(code);
                    setCodeViewerSetting({
                        open: false,
                        param: trackingSetting
                    });
                }}
            />
        </div>
    )
}


export default Setting;