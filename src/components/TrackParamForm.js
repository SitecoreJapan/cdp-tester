import {useContext, useState} from "react";
import sendEvent, {convertJsonToParameter, generateJson} from "../util/TrackUtil";
import {loadJson, saveJson} from "../util/StorageUtil";
import getAppContext from "../context/AppContext";
import {
    createInitialValue,
    getChannelOptions,
    getTypeOptions,
    getLanguageOptions,
    getCurrencyOptions,
    getCountryOptions,
    genRandomProductReferenceId,
    genRandomOrderReferenceId,
    getOrderStatusOptions,
    getOrderPaymentTypeOptions, getOrderCardTypeOptions, genRandomProductId
} from "./TrackParamFormHelper";
import TrackParamEditor from "./TrackParamEditor";
import LoadingSvgIcon from "./LoadingSvgIcon";
import TrackCodeViewer from "./TrackCodeViewer";

export default function TrackParamForm({title, description, type}) {

    // setting: parameters set in Setting
    const {setting, dispatch} = useContext(getAppContext());

    // localstorage key to save traking parameter
    const STORAGE_KEY_TRACK_PARAM = `tracking_param_${type}`;

    // // set initial value including saved localstorage value
    // let dtInitValue = (new Date()).toISOString().split('T')[0].replaceAll('/', '-');
    // let dobInitValue = (new Date((new Date()).setFullYear((new Date()).getFullYear() - 30))).toISOString().split('T')[0].replaceAll('/', '-');
    let initValue = createInitialValue(type, setting.pointOfSale);
    let savedTrackingParam = loadJson(STORAGE_KEY_TRACK_PARAM);
    if(savedTrackingParam) {
        initValue = {...initValue, ...savedTrackingParam, pos: setting.pointOfSale};
    }

    const [param, setParam] = useState(initValue);
    let changeParam = (newParam) => {
        setParam(newParam);
        saveJson(STORAGE_KEY_TRACK_PARAM, newParam);
    };

    // json editor state
    const [jsonEditorSetting, setJsonEditorSetting] = useState({
        open: false,
        param: generateJson(param)
    });

    // code viewer state
    const [codeViewerSetting, setCodeViewerSetting] = useState({
        open: false,
        param: generateJson(param)
    });

    const [sendAnimation, setSendAnimation] = useState(false);
    let sendEventWithAnimation = (json) => {
        setSendAnimation(true);
        sendEvent(json, (data) => {
            console.log(data);
            setSendAnimation(false);
        })
    }


    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={event => false}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-violet-700">{title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Channel(channel)</span><br/>
                                <span>The channel captured on each page the guest visited</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    value={param.channel}
                                    onChange={event => {
                                        let newParam = {...param, channel: event.target.value};
                                        changeParam(newParam);
                                    }}
                                >
                                    {getChannelOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Type(type)</span><br/>
                                <span>The type of event</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                {(() => {
                                    if(type !== "CUSTOM") {
                                        return (
                                            <select
                                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                value={param.type}
                                                onChange={event => {
                                                    let newParam = {...param, type: event.target.value};
                                                    changeParam(newParam);
                                                }}
                                            >
                                                {getTypeOptions(type)}
                                            </select>
                                        );
                                    } else {
                                        return (
                                            <input
                                                type="text"
                                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                placeholder="ex: CUSTOM_EVENT_NAME"
                                                value={param.type}
                                                onChange={event => {
                                                    let newParam = {...param, type: event.target.value};
                                                    changeParam(newParam);
                                                }}
                                            />
                                        );
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Language(language)</span><br/>
                                <span>The language captured on each page the guest visited</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    value={param.language}
                                    onChange={event => {
                                        let newParam = {...param, language: event.target.value};
                                        changeParam(newParam);
                                    }}
                                >
                                    {getLanguageOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Currency(currency)</span><br/>
                                <span>The type of currency.</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    value={param.currency}
                                    onChange={event => {
                                        let newParam = {...param, currency: event.target.value};
                                        changeParam(newParam);
                                    }}
                                >
                                    {getCurrencyOptions()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Page(page)</span><br/>
                                <span>The name of the web page the guest visited. <br/>ex. "home page", "search page" "/home", "/confirm"</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    placeholder="ex: /home"
                                    value={param.page}
                                    onChange={event => {
                                        let newParam = {...param, page: event.target.value};
                                        changeParam(newParam);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Point of Sales(pos)</span><br/>
                                <span>The point of sale (storefront) captured on each page the guest visited.</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    value={param.pos}
                                    onChange={event => {
                                        let newParam = {...param, pos: event.target.value};
                                        changeParam(newParam);
                                        // call dispatch to change current pointOfSale setting in menus/Setting.js
                                        let action = {type: "pointOfSale", payload: {pointOfSale: event.target.value}};
                                        dispatch(action);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                <span className="text-red-600 font-bold">*</span>
                                <span className="font-bold">Browser ID(browser_id)</span><br/>
                                <span>The ID of a browser generated by Sitecore CDP.</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                    value={param.browser_id}
                                    onChange={event => {
                                        let newParam = {...param, browser_id: event.target.value};
                                        changeParam(newParam);
                                    }}
                                />
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={event => {
                                        if(window.Boxever) {
                                            let browserId = window.Boxever.getID();
                                            let newParam = {...param, browser_id: browserId};
                                            changeParam(newParam);
                                        }
                                    }}
                                >
                                    Load
                                </button>
                            </div>
                        </div>
                    </div>
                    {(() => {
                        if(type === "SEARCH" || type === "CUSTOM") {
                            return (
                                <>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-orange-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Product Name</span><br/>
                                                <span>The product name the guest searched for.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Product Name for search"
                                                    value={param.product_name}
                                                    onChange={event => {
                                                        let newParam = {...param, product_name: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-orange-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Product Type(product_type)</span><br/>
                                                <span>The product type the guest searched for. *Uppercase</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline uppercase"
                                                    placeholder="Product Type for search"
                                                    value={param.product_type}
                                                    onChange={event => {
                                                        let newParam = {...param, product_type: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>

                            );
                        }
                    })()}
                    {(() => {
                        if(type === "IDENTITY" || type === "CUSTOM") {
                            return (
                                <>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-pink-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Identifier(identifiers.id)</span><br/>
                                                <span>The name of the organization's identity system, external to Sitecore CDP, that provided the unique identifier.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.identifier.id}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            identifier: {...param.identifier, id: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-pink-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Identifier Provider(identifiers.provider)</span><br/>
                                                <span>The unique guest identifier from the organization's identity system, such as a Customer Relationship Management (CRM) system.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.identifier.provider}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            identifier: {
                                                                ...param.identifier,
                                                                provider: event.target.value
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Identifier Expiration(identifiers.expiry_date)</span><br/>
                                                <span>The date the guest's unique ID is set to expire, according to the customer's identity system, such as a CRM system.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.identifier.expiry_date}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            identifier: {
                                                                ...param.identifier,
                                                                expiry_date: event.target.value
                                                            }
                                                        }
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">First Name(firstname)</span><br/>
                                                <span>The first name of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.firstname}
                                                    onChange={event => {
                                                        let newParam = {...param, firstname: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Last Name(lastname)</span><br/>
                                                <span>The last name of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.lastname}
                                                    onChange={event => {
                                                        let newParam = {...param, lastname: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Title(title)</span><br/>
                                                <span>The title of the guest.<br/>ex. "Br", "Brigadier", "Capt", "Colonel", "Dame", "Dr", "Elder", "Fr", "General", "Hon", "Judge", "Lady", "Lord", "Master", "Miss", "Mr", "Mrs", "Ms", "Mstr", "Prof", "Rabbi", "Rev", "Shaikha", "Sheikh", "Sir", "Sister", "Sr"</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.title}
                                                    onChange={event => {
                                                        let newParam = {...param, title: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Email address(email)</span><br/>
                                                <span>The email address of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.email}
                                                    onChange={event => {
                                                        let newParam = {...param, email: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Mobile(mobile)</span><br/>
                                                <span>The mobile number of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="tel"
                                                    autoComplete="tel-national"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.mobile}
                                                    onChange={event => {
                                                        let newParam = {...param, mobile: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Phone(phone)</span><br/>
                                                <span>The phone number of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="tel"
                                                    autoComplete="tel-national"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.phone}
                                                    onChange={event => {
                                                        let newParam = {...param, phone: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Street address(street)</span><br/>
                                                <span>The street address of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="street-address"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.street}
                                                    onChange={event => {
                                                        let newParam = {...param, street: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">City(city)</span><br/>
                                                <span>The city address of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.city}
                                                    onChange={event => {
                                                        let newParam = {...param, city: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">State(state)</span><br/>
                                                <span>The state address of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="address-level1"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.state}
                                                    onChange={event => {
                                                        let newParam = {...param, state: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Country(country)</span><br/>
                                                <span>The country address of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.country}
                                                    onChange={event => {
                                                        let newParam = {...param, country: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getCountryOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">ZIP / Postal code(postal_code)</span><br/>
                                                <span>The postal code of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.postal_code}
                                                    onChange={event => {
                                                        let newParam = {...param, postal_code: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Birthday(dob)</span><br/>
                                                <span>The date of birth of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.dob}
                                                    onChange={event => {
                                                        let newParam = {...param, dob: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Gender(gender)</span><br/>
                                                <span>The gender of the guest.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.gender}
                                                    onChange={event => {
                                                        let newParam = {...param, gender: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    <option value="">-</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}
                    {(() => {
                        if(type === "ADD" || type === "CONFIRM" || type === "CUSTOM") {
                            return (
                                <>
                                    {(() => {
                                        if(type === "ADD" || type === "CUSTOM") {
                                            return (
                                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                            {(() => {
                                                                if(type === "CUSTOM") {
                                                                    return <span className="text-amber-700 font-bold">*</span>;
                                                                } else {
                                                                    return <span className="text-red-600 font-bold">*</span>;
                                                                }
                                                            })()}
                                                            <span className="font-bold">Product Type(product.type)</span><br/>
                                                            <span>The type of product added to cart.</span>
                                                        </label>
                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                            <input
                                                                type="text"
                                                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md uppercase"
                                                                value={param.product.type}
                                                                onChange={event => {
                                                                    let newParam = {
                                                                        ...param,
                                                                        product: {...param.product, type: event.target.value}
                                                                    };
                                                                    changeParam(newParam);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })()}
                                    {(() => {
                                        if(type === "ADD" || type === "CONFIRM" || type === "CUSTOM") {
                                            return(
                                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                            {(() => {
                                                                if(type === "CUSTOM") {
                                                                    return <span className="text-rose-600 font-bold">*</span>;
                                                                } else {
                                                                    return <span className="text-red-600 font-bold">*</span>;
                                                                }
                                                            })()}
                                                            <span className="font-bold">Product Item ID(product.item_id)</span><br/>
                                                            <span>The item id of the product added to cart. Used in Extract, Transform, Load (ETL) data integration to create the order.</span>
                                                        </label>
                                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                            <input
                                                                type="text"
                                                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                                value={param.product.item_id}
                                                                onChange={event => {
                                                                    let newParam = {
                                                                        ...param,
                                                                        product: {...param.product, item_id: event.target.value}
                                                                    };
                                                                    changeParam(newParam);
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                onClick={event => {
                                                                    let randomId = genRandomProductId();
                                                                    let newParam = {
                                                                        ...param,
                                                                        product: {...param.product, item_id: randomId}
                                                                    };
                                                                    changeParam(newParam);
                                                                }}
                                                            >
                                                                Generate
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })()}
                                    {(() => {
                                        if(type === "ADD" || type === "CUSTOM") {
                                            return(
                                                <>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product Name(product.name)</span><br/>
                                                                <span>The name of the product added to the cart.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="text"
                                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.name}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, name: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product Order Date(product.orderedAt)</span><br/>
                                                                <span>The date and time the product was ordered.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="date"
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.orderedAt}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, orderedAt: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product Quantity(product.quantity)</span><br/>
                                                                <span>The number of unit added. Total price of the product is calculated by unit price multiplied by quantity.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="number"
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.quantity}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, quantity: parseInt(event.target.value)}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product Price(product.price)</span><br/>
                                                                <span>The unit price of the product. Total price of the product is calculated by unit price multiplied by quantity.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="number"
                                                                    step={0.01}
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.price}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, price: parseFloat(event.target.value)}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product ID(product.productId)</span><br/>
                                                                <span>The product ID of the product added. Used in analytics for reporting.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="text"
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                                    value={param.product.productId}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, productId: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    onClick={event => {
                                                                        let copiedId = param.product.item_id;
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, productId: copiedId}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                >
                                                                    Copy from Item ID
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                {(() => {
                                                                    if(type === "CUSTOM") {
                                                                        return <span className="text-amber-700 font-bold">*</span>;
                                                                    } else {
                                                                        return <span className="text-red-600 font-bold">*</span>;
                                                                    }
                                                                })()}
                                                                <span className="font-bold">Product Currency(product.currency)</span><br/>
                                                                <span>The currency of the product added to the cart.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <select
                                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.currency}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, currency: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                >
                                                                    {getCurrencyOptions()}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                <span className="font-bold">Product Original Price(product.originalPrice)</span><br/>
                                                                <span>The unit price of the order item before conversion to the organization's currency.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="number"
                                                                    step={0.01}
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.originalPrice}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, originalPrice: parseFloat(event.target.value)}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                <span className="font-bold">Product Original Currency(product.originalCurrencyCode)</span><br/>
                                                                <span>The original currency code for the order item.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <select
                                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                                    value={param.product.originalCurrencyCode}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, originalCurrencyCode: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                >
                                                                    {getCurrencyOptions()}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                                <span className="font-bold">Product Reference ID(product.referenceId)</span><br/>
                                                                <span>An ID generated by your organization to reference the order item.</span>
                                                            </label>
                                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="text"
                                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                                    value={param.product.referenceId}
                                                                    onChange={event => {
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, referenceId: event.target.value}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    onClick={event => {
                                                                        let randomId = genRandomProductReferenceId(param.product.productId);
                                                                        let newParam = {
                                                                            ...param,
                                                                            product: {...param.product, referenceId: randomId}
                                                                        };
                                                                        changeParam(newParam);
                                                                    }}
                                                                >
                                                                    Generate
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }
                                    })()}
                                </>
                            );
                        }
                    })()}
                    {(() => {
                        if (type === "ADD_CONTACTS" || type === "CUSTOM") {
                            return (
                                <>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-pink-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Contact Identifier(contact.identifiers.id)</span><br/>
                                                <span>The identifier ID.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.identifier.id}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            contact: {...param.contact, identifier: {...param.contact.identifier, id: event.target.value}}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-pink-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Contact Identifier Provider(contact.identifiers.provider)</span><br/>
                                                <span>The identifier provider.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.contact.identifier.provider}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            contact: {...param.contact, identifier: {...param.contact.identifier, provider: event.target.value}}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-pink-400 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Contact Identifier Expiration(contact.identifiers.expiryDate)</span><br/>
                                                <span>The expiry date of the identifier.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.identifier.expiry_date}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            contact: {...param.contact, identifier: {...param.contact.identifier, expiry_date: event.target.value}}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact First Name</span><br/>
                                                <span>The first name of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.firstname}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, firstname: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Last Name</span><br/>
                                                <span>The last name of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.lastname}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, lastname: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Title</span><br/>
                                                <span>The title of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.title}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, title: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Email address(contact.email)</span><br/>
                                                <span>The email address of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.email}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, email: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Mobile(contact.mobile)</span><br/>
                                                <span>The mobile number of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="tel"
                                                    autoComplete="tel-national"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.mobile}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, mobile: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Phone(contact.phone)</span><br/>
                                                <span>The phone number of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="tel"
                                                    autoComplete="tel-national"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.phone}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, phone: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Street address(contact.street)</span><br/>
                                                <span>The street address of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="street-address"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.street}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, street: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact City(contact.city)</span><br/>
                                                <span>The city address of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="address-level2"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.city}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, city: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact State(contact.state)</span><br/>
                                                <span>The state address of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="address-level1"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.state}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, state: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Country Code(contact.country_code)</span><br/>
                                                <span>The country code of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.country_code}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, country_code: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getCountryOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Postal code(contact.postal_code)</span><br/>
                                                <span>The postcode of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    autoComplete="postal-code"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.postal_code}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, postal_code: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Birthday(contact.dob)</span><br/>
                                                <span>The date of birth of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.dob}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, dob: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="country"
                                                   className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Contact Gender(contact.gender)</span><br/>
                                                <span>The gender of the contact.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.contact.gender}
                                                    onChange={event => {
                                                        let newParam = {...param, contact: {...param.contact, gender: event.target.value}};
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    <option value="">-</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}
                    {(() => {
                        if (type === "CHECKOUT" || type === "CUSTOM") {
                            return (
                                <>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-fuchsia-500 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Reference ID</span><br/>
                                                <span>The reference of the order.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.reference_id}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            reference_id: event.target.value
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={event => {
                                                        let randomId = genRandomOrderReferenceId();
                                                        let newParam = {
                                                            ...param,
                                                            reference_id: randomId
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    Generate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-fuchsia-500 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Status</span><br/>
                                                <span>The status of the order.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.status}
                                                    onChange={event => {
                                                        let newParam = {...param, status: event.target.value};
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getOrderStatusOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}
                    {(() => {
                        if (type === "ORDER_CHECKOUT" || type === "CUSTOM") {
                            return (
                                <>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Reference ID(order.referenceId)</span><br/>
                                                <span>A unique ID generated by your organization to reference the order.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.order.referenceId}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, referenceId: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={event => {
                                                        let randomId = genRandomOrderReferenceId();
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, referenceId: randomId}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    Generate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Date(order.orderedAt)</span><br/>
                                                <span>The date and time the order was made.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderedAt}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, orderedAt: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Status(order.status)</span><br/>
                                                <span>The status of the order</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.status}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, status: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getOrderStatusOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Currency(order.currencyCode)</span><br/>
                                                <span>The currency the guest used to complete a purchase.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.currencyCode}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, currencyCode: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getCurrencyOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Price(order.price)</span><br/>
                                                <span>The amount paid for the order</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="number"
                                                    step={0.01}
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.order.price}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, price: parseFloat(event.target.value)}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(() => {
                                                    if(type === "CUSTOM") {
                                                        return <span className="text-yellow-600 font-bold">*</span>;
                                                    } else {
                                                        return <span className="text-red-600 font-bold">*</span>;
                                                    }
                                                })()}
                                                <span className="font-bold">Order Payment Type(order.paymentType)</span><br/>
                                                <span>The method of payment for the order.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.paymentType}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, paymentType: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getOrderPaymentTypeOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                {(()=>{
                                                    if(param.order.paymentType === "Card") {
                                                        return <span className="text-red-600 font-bold">*</span>
                                                    }
                                                })()}
                                                <span className="font-bold">Order Card Type(order.cardType)</span><br/>
                                                <span>The card type used to pay for the order.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.cardType}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {...param.order, cardType: event.target.value}
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getOrderCardTypeOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Type(order.orderItems.type)</span><br/>
                                                <span>The type of order item. The accepted values must be predefined for your organization in the schema.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.type}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, type: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Reference ID(order.orderItems.referenceId)</span><br/>
                                                <span>An ID generated by the client to reference the order item.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.order.orderItem.referenceId}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, referenceId: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={event => {
                                                        let randomId = genRandomOrderReferenceId(param.order.orderItem.productId);
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, referenceId: randomId}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    Generate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Order Date(order.orderItems.orderedAt)</span><br/>
                                                <span>The date and time the order item was made.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="date"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.orderedAt}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, orderedAt: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Status(order.orderItems.status)</span><br/>
                                                <span>The status of the order item.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.status}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, status: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getOrderStatusOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Currency(order.orderItems.currencyCode)</span><br/>
                                                <span>The organization’s currency code for the order item.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.currencyCode}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, currencyCode: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                >
                                                    {getCurrencyOptions()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Price(order.orderItems.price)</span><br/>
                                                <span>The organization’s price for the order item.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="number"
                                                    step={0.01}
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline"
                                                    value={param.order.orderItem.price}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, price: parseFloat(event.target.value)}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div
                                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Name(order.orderItems.name)</span><br/>
                                                <span>The name of the order item. A free text value for the name of the order item. Max limit: 128</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.name}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, name: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Product ID(order.orderItems.productId)</span><br/>
                                                <span>The ID of the product code.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.productId}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, productId: event.target.value}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                <span className="font-bold">Order Item Quantity(order.orderItems.quantity)</span><br/>
                                                <span>The number or quantity of the order item.</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="number"
                                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                                    value={param.order.orderItem.quantity}
                                                    onChange={event => {
                                                        let newParam = {
                                                            ...param,
                                                            order: {
                                                                ...param.order,
                                                                orderItem: {...param.order.orderItem, quantity: parseInt(event.target.value)}
                                                            }
                                                        };
                                                        changeParam(newParam);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    })()}
                </div>
            </div>
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={event => {
                            setCodeViewerSetting({
                                open: true,
                                param: generateJson(param)
                            });
                        }}
                    >
                        Tracking Code
                    </button>
                    <button
                        type="button"
                        className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={event => {
                            setJsonEditorSetting({
                                open: true,
                                param: generateJson(param)
                            });
                            console.log("=== parameter ===");
                            console.log(param);
                            console.log("=== generated JSON ===");
                            console.log(generateJson(param));
                        }}
                    >
                        JSON Editor
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={event => {
                            let json = generateJson(param);
                            try {
                                sendEventWithAnimation(json);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        Send
                    </button>
                    {(() => {
                        if(sendAnimation) {
                            return (
                                <span className="p-1">
                                    <LoadingSvgIcon/>
                                </span>
                            );
                        }
                    })()}
                </div>
            </div>
            <TrackParamEditor
                open={jsonEditorSetting.open}
                param={jsonEditorSetting.param}
                onChangeJson={(json) => {
                    // let newParam = convertJsonToParameter(json, param);
                    // console.log(newParam);}
                    setJsonEditorSetting({
                        open: true,
                        param: json
                    });
                }}
                onCancel={() => {
                    setJsonEditorSetting({
                        open: false,
                        param: generateJson(param)
                    })
                }}
                onSave={(json) => {
                    console.log("json");
                    console.log(json);
                    setJsonEditorSetting({
                        open: false,
                        param: json
                    });
                    let newParam = convertJsonToParameter(json, param);
                    console.log("newParam");
                    console.log(newParam);
                    changeParam(newParam);
                }}
                onRequestSend={(json) => {
                    setJsonEditorSetting({
                        open: false,
                        param: json
                    });
                    sendEventWithAnimation(json);
                }}
            />
            <TrackCodeViewer
                open={codeViewerSetting.open}
                param={codeViewerSetting.param}
                type="event"
                onClose={(code) => {
                    console.log(code);
                    setCodeViewerSetting({
                        open: false,
                        param: {}
                    });
                }}
                onCopy={(code) => {
                    console.log(code);
                    setCodeViewerSetting({
                        open: false,
                        param: {}
                    });
                }}
            />
        </form>
    )
}