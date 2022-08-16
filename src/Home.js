import React from 'react';
import TrackTest from "./components/TrackTest";

function Home(props) {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold my-6">How to</h1>
            <p className="text-center text-lg my-6">
                <span>1. Set your Sitecore CDP environment parameters.</span>
            </p>
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-screen-lg">
                <button
                    type="button"
                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="sr-only">Watch our video to learn more</span>
                    <img
                        className="w-full"
                        src={process.env.PUBLIC_URL + '/operation1.gif'}
                    />
                    <span className="absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
                  </span>
                </button>
            </div>
            <p className="text-center text-lg my-6">
                <span>2. Set event parameters then send the event.</span>
            </p>
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-screen-lg">
                <button
                    type="button"
                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="sr-only">Watch our video to learn more</span>
                    <img
                        className="w-full"
                        src={process.env.PUBLIC_URL + '/operation2.gif'}
                    />
                    <span className="absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
                  </span>
                </button>
            </div>
        </div>
    );
}

export default Home;