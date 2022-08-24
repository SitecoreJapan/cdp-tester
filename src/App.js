import { useState, useReducer } from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {
    HomeIcon,
    DocumentSearchIcon,
    FingerPrintIcon,
    ShoppingCartIcon,
    PencilIcon,
    CogIcon,
    CursorClickIcon
} from '@heroicons/react/outline'
import StandardEvent from "./menus/StandardEvent";
import OrderEvent from "./menus/OrderEvent";
import IdentityEvent from "./menus/IdentityEvent";
import CustomEvent from "./menus/CustomEvent";
import Setting, {STORAGE_KEY_TRACK_SETTING} from "./menus/Setting";
import Home from "./Home";
import {appSettingReducer, appSettingInitialState} from "./reducers/AppSettingReducer";
import getAppContext from "./context/AppContext";
import {loadJson} from "./util/StorageUtil";
import Test from "./menus/Test";
import ExperienceTest from "./components/ExperienceTest";
import ExperienceTestPage from "./components/ExperienceTestPage";

function App() {

    // set application setting so tha other component can read the setting by useContext
    let initArg = {...appSettingInitialState};
    let savedTrackingSetting = loadJson(STORAGE_KEY_TRACK_SETTING);
    if(savedTrackingSetting) {
        initArg = {...initArg,...savedTrackingSetting};
    }
    const [appSetting, dispatch] = useReducer(appSettingReducer, {...initArg});
    const appContextValue = {
        setting: appSetting,
        dispatch
    };
    const AppContext = getAppContext(appContextValue);

    // check selected tab for change focus color
    let selectedLink = "home";
    let currentPath = window.location.pathname;
    if(/\/standard_ev/.test(currentPath)) {
        selectedLink = "standard_ev";
    } else if(/\/identity_ev/.test(currentPath)) {
        selectedLink = "identity_ev";
    } else if(/\/order_ev/.test(currentPath)) {
        selectedLink = "order_ev";
    } else if(/\/custom_ev/.test(currentPath)) {
        selectedLink = "custom_ev";
    } else if(/\/setting/.test(currentPath)) {
        selectedLink = "setting";
    } else if(/\/experience/.test(currentPath)) {
        selectedLink = "experience";
    }
    const [navigation, setNavigation] = useState(
        {
            selectedLink: selectedLink
        }
    )
    let getLinkClass = (selected) => {
        if(selected) {
            return "bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md";
        } else {
            return "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md";
        }
    };
    let getIconClass = (selected) => {
        if(selected) {
            return "text-gray-500 mr-3 flex-shrink-0 h-6 w-6";
        } else {
            return "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
        }
    };
    let onClickLink = (event) => {
        let linkName = event.target.dataset.name;
        setNavigation({...navigation, selectedLink: linkName});
    };
    return (
        <AppContext.Provider value={appContextValue}>
            <div>
                {/* Static sidebar for desktop */}
                <div className="md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-8 w-auto"
                                src="/sitecore-logo.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="mt-5 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                <Link to="/" className={getLinkClass(navigation.selectedLink === "home")} data-name="home" onClick={onClickLink}>
                                    <HomeIcon className={getIconClass(navigation.selectedLink === "home")}/>
                                    Home
                                </Link>
                                <Link to="/standard_ev" className={getLinkClass(navigation.selectedLink === "standard_ev")} data-name="standard_ev" onClick={onClickLink}>
                                    <DocumentSearchIcon className={getIconClass(navigation.selectedLink === "standard_ev")}/>
                                    Standard Event
                                </Link>
                                <Link to="/identity_ev" className={getLinkClass(navigation.selectedLink === "identity_ev")} data-name="identity_ev" onClick={onClickLink}>
                                    <FingerPrintIcon className={getIconClass(navigation.selectedLink === "identity_ev")}/>
                                    Identity Event
                                </Link>
                                <Link to="/order_ev" className={getLinkClass(navigation.selectedLink === "order_ev")} data-name="order_ev" onClick={onClickLink}>
                                    <ShoppingCartIcon className={getIconClass(navigation.selectedLink === "order_ev")}/>
                                    Oder Event
                                </Link>
                                <Link to="/custom_ev" className={getLinkClass(navigation.selectedLink === "custom_ev")} data-name="custom_ev" onClick={onClickLink}>
                                    <PencilIcon className={getIconClass(navigation.selectedLink === "custom_ev")}/>
                                    Custom Event
                                </Link>
                                <Link to="/experience" className={getLinkClass(navigation.selectedLink === "experience")} data-name="experience" onClick={onClickLink}>
                                    <CursorClickIcon className={getIconClass(navigation.selectedLink === "experience")}/>
                                    Experience Test
                                </Link>
                                <Link to="/setting" className={getLinkClass(navigation.selectedLink === "setting")} data-name="setting" onClick={onClickLink}>
                                    <CogIcon className={getIconClass(navigation.selectedLink === "setting")}/>
                                    Setting
                                </Link>
                                {/*<Link to="/test" className={getLinkClass(navigation.selectedLink === "test")} data-name="test" onClick={onClickLink}>*/}
                                {/*    <CogIcon className={getIconClass(navigation.selectedLink === "test")}/>*/}
                                {/*    Test*/}
                                {/*</Link>*/}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <main className="flex-1 px-6 py-8">
                        <Routes>
                            <Route exact path="/" element={<Home/>}></Route>
                            <Route exact path="/standard_ev" element={<StandardEvent/>}></Route>
                            <Route exact path="/identity_ev" element={<IdentityEvent/>}></Route>
                            <Route exact path="/order_ev" element={<OrderEvent/>}></Route>
                            <Route exact path="/custom_ev" element={<CustomEvent/>}></Route>
                            <Route exact path="/experience" element={<ExperienceTest/>}></Route>
                            <Route exact path="/setting" element={<Setting/>}></Route>
                            <Route path="/:relative_path" element={<ExperienceTestPage/>}></Route>
                            <Route path="/:relative_path/:child" element={<ExperienceTestPage/>}></Route>
                            <Route path="/:relative_path/:child/:grandchild" element={<ExperienceTestPage/>}></Route>
                            <Route path="/:relative_path/:child/:grandchild/:great_grandchild" element={<ExperienceTestPage/>}></Route>
                            {/*<Route exact path="/test" element={<Test/>}></Route>*/}
                        </Routes>
                    </main>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
