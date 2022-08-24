import React, {Fragment, useState, useRef} from 'react';
// import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/outline'
// import TrackParamEditor from "../components/TrackParamEditor";
// import {createInitialValue} from "../components/TrackParamFormHelper";
import {Disclosure} from "@headlessui/react";

function Test() {

    return (
        <>
            <Disclosure>
                <Disclosure.Button className="py-2">
                    Is team pricing available?
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                    Yes! You can purchase a license that you can share with your entire
                    team.
                </Disclosure.Panel>
            </Disclosure>
        </>
    );
}

export default Test;