import React from 'react';
import TrackParamForm from "../components/TrackParamForm";

function StandardEvent(props) {
    return (
        <>
            <div className="m-5">

                <div className="accordion">
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_track_view">
                            <button
                                className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_track_view"
                                aria-expanded="true"
                                aria-controls="collapse_track_view"
                            >
                                View Event
                            </button>
                        </h2>
                        <div id="collapse_track_view" className="accordion-collapse collapse show" aria-labelledby="heading_track_view">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="View Event Tracking"
                                    description="parameter setting for tracking view event"
                                    type="VIEW"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_track_search">
                            <button
                                className=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_track_search"
                                aria-expanded="false"
                                aria-controls="collapse_track_search"
                            >
                                Search Event
                            </button>
                        </h2>
                        <div id="collapse_track_search" className="accordion-collapse collapse" aria-labelledby="heading_track_search">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Search Event Tracking"
                                    description="parameter setting for tracking view event"
                                    type="SEARCH"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StandardEvent;