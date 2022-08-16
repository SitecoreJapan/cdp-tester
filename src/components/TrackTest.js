import {useState} from "react";
import sendEvent from "../util/TrackUtil";

function TrackTest(props) {
    const defaultJson = {
        "channel": "WEB",
        "type": "VIEW",
        "language": "ja",
        "currency": "JPY",
        "page": window.location.pathname,
        "pos": "jp-pta-test",
        "browser_id": "",
        "email": "",
        "firstname": "",
        "lastname": ""
    };
    const [jsonString, setJson] = useState(JSON.stringify(defaultJson, null, "\t"));

    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Send Event TEST
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    rows={10}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    onChange={event => {
                        let newJsonString = event.target.value;
                        setJson(newJsonString);
                    }}
                    value={jsonString}
                ></textarea>
                <p className="mt-2 text-sm text-gray-500">Paste JSON to execute a event</p>
                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={event => {
                                try {
                                    let json = JSON.parse(jsonString);
                                    sendEvent(json);
                                } catch (error) {
                                    console.log((error))
                                }
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackTest;