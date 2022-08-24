import {useState} from 'react';

function ExperienceTest() {
    const [path, setPath] = useState("");
    const [parameters, setParameters] = useState({
        divID: ""
    });
    return (
        <>
            <div className="bg-white shadow sm:rounded-lg my-6">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Test Page Path</h3>
                    <div className="mt-2 text-sm text-gray-500">
                        <p>
                            <span>Enter your test page path to test experience. You may include relative paths up to four levels.</span><br/>
                            <span>Example: /relative_path/child/grandchild/great_grandchild</span>
                        </p>
                    </div>
                    <form className="mt-5 sm:flex sm:items-center">
                        <div className="w-full ">
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="flex rounded-md shadow-sm"><span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                    {(() => window.location.host )()}
                                </span>
                                    <input
                                        type="text"
                                        name="path"
                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        onChange={(event) => {
                                            let newPath = event.target.value;
                                            setPath(newPath);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <a
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            target="_blank"
                            href={`${path}?${parameters.divID ? 'divID=' + parameters.divID + '&' : ''}`}
                            rel="noreferrer"
                        >
                            Open
                        </a>
                    </form>
                </div>
            </div>
            <div className="bg-white shadow sm:rounded-lg my-6">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Parameters</h3>


                        <div className="md:grid md:grid-cols-1 md:gap-6">
                            <div className="mt-5 md:mt-0 md:col-span-1 py-4">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            div ID (insert a div for replacing HTML)
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            value={parameters.divID}
                                            onChange={(event) => {
                                                let newParameters = {...parameters, divID: event.target.value};
                                                setParameters(newParameters);
                                            }}
                                        />
                                    </div>

                                    {/*<div className="col-span-6">*/}
                                    {/*    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">*/}
                                    {/*        Street address*/}
                                    {/*    </label>*/}
                                    {/*    <input*/}
                                    {/*        type="text"*/}
                                    {/*        name="street-address"*/}
                                    {/*        id="street-address"*/}
                                    {/*        autoComplete="street-address"*/}
                                    {/*        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>



                </div>
            </div>
        </>
    );
}

export default ExperienceTest;