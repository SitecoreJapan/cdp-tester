import React from 'react';
import TrackParamForm from "../components/TrackParamForm";

function OrderEvent(props) {
    return (
        <>
            <div className="m-5">

                <div className="accordion">
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_order_add">
                            <button
                                className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_order_add"
                                aria-expanded="true"
                                aria-controls="collapse_order_add"
                            >
                                Add Event
                            </button>
                        </h2>
                        <div id="collapse_order_add" className="accordion-collapse collapse show" aria-labelledby="heading_order_add">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Order Add Event Tracking"
                                    description="parameter setting for tracking order add event"
                                    type="ADD"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_order_add_contacts">
                            <button
                                className=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_order_add_contacts"
                                aria-expanded="false"
                                aria-controls="collapse_order_add_contacts"
                            >
                                Add Contacts Event
                            </button>
                        </h2>
                        <div id="collapse_order_add_contacts" className="accordion-collapse collapse" aria-labelledby="heading_order_add_contacts">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Add Contacts Event Tracking"
                                    description="parameter setting for order add contacts event"
                                    type="ADD_CONTACTS"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_order_confirm">
                            <button
                                className=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_order_confirm"
                                aria-expanded="false"
                                aria-controls="collapse_order_confirm"
                            >
                                Confirm Event
                            </button>
                        </h2>
                        <div id="collapse_order_confirm" className="accordion-collapse collapse" aria-labelledby="heading_order_confirm">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Confirm Event Tracking"
                                    description="parameter setting for order confirm event"
                                    type="CONFIRM"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_checkout">
                            <button
                                className=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_checkout"
                                aria-expanded="false"
                                aria-controls="collapse_checkout"
                            >
                                Checkout Event
                            </button>
                        </h2>
                        <div id="collapse_checkout" className="accordion-collapse collapse" aria-labelledby="heading_checkout">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Checkout Event Tracking"
                                    description="parameter setting for order checkout event"
                                    type="CHECKOUT"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-white border border-gray-200">
                        <h2 className="accordion-header mb-0" id="heading_order_checkout">
                            <button
                                className=" accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse_order_checkout"
                                aria-expanded="false"
                                aria-controls="collapse_order_checkout"
                            >
                                Order Checkout Event
                            </button>
                        </h2>
                        <div id="collapse_order_checkout" className="accordion-collapse collapse" aria-labelledby="heading_order_checkout">
                            <div className="accordion-body py-4 px-5">
                                <TrackParamForm
                                    title="Order Checkout Event Tracking"
                                    description="parameter setting for checkout with order details"
                                    type="ORDER_CHECKOUT"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderEvent;