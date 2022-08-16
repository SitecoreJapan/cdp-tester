import React from 'react';
import TrackParamForm from "../components/TrackParamForm";

function IdentityEvent(props) {
    return (
        <>
            <div className="m-5">
                <div className="accordion">
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_identity">
                            <button
                                className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_identity"
                                aria-expanded="true"
                                aria-controls="collapse_identity"
                            >
                                View Event
                            </button>
                        </h2>
                        <div id="collapse_identity" className="accordion-collapse collapse show" aria-labelledby="heading_identity">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="IDENTITY Event Tracking"
                                    description="parameter setting for tracking identity event"
                                    type="IDENTITY"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IdentityEvent;