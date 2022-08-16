import React from 'react';
import TrackParamForm from "../components/TrackParamForm";

function CustomEvent(props) {
    return (
        <>
            <div className="m-5">
                <div className="accordion">
                    <h2 className="accordion-header mb-0" id="heading_custom_event">
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse_custom_event"
                            aria-expanded="true"
                            aria-controls="collapse_custom_event"
                        >
                            Custom Event
                        </button>
                    </h2>
                    <div id="collapse_custom_event" className="accordion-collapse collapse show" aria-labelledby="heading_custom_event">
                        <div className="accordion-body py-4 px-5">
                            <TrackParamForm
                                title="Custom Event Tracking"
                                description="parameter setting for custom event"
                                type="CUSTOM"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomEvent;