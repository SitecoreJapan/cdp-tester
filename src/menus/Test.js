import React, {Fragment, useState, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import TrackParamEditor from "../components/TrackParamEditor";
import {createInitialValue} from "../components/TrackParamFormHelper";

function Test() {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    let testJson = createInitialValue();

    return (
        <>
            <div className="m-5">
                <div>
                    <button onClick={() => {
                        setOpen(!open);
                    }}>toggle</button>
                </div>
                <TrackParamEditor
                    open={open}
                    param={testJson}
                    onChangeJson={(newParam) => {
                        console.log(newParam);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            </div>

        </>
    );
}

export default Test;