import React from 'react';

function LoadingSvgIcon({show}) {
    return (
        <>
            <svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" stroke="#4f46e5">
                <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
                    <circle cx="22" cy="22" r="6" stroke-opacity="0">
                        <animate attributeName="r"
                                 begin="1.5s" dur="3s"
                                 values="6;22"
                                 calcMode="linear"
                                 repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                                 begin="1.5s" dur="3s"
                                 values="1;0" calcMode="linear"
                                 repeatCount="indefinite" />
                        <animate attributeName="stroke-width"
                                 begin="1.5s" dur="3s"
                                 values="2;0" calcMode="linear"
                                 repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="6" stroke-opacity="0">
                        <animate attributeName="r"
                                 begin="3s" dur="3s"
                                 values="6;22"
                                 calcMode="linear"
                                 repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                                 begin="3s" dur="3s"
                                 values="1;0" calcMode="linear"
                                 repeatCount="indefinite" />
                        <animate attributeName="stroke-width"
                                 begin="3s" dur="3s"
                                 values="2;0" calcMode="linear"
                                 repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="8">
                        <animate attributeName="r"
                                 begin="0s" dur="1.5s"
                                 values="6;1;2;3;4;5;6"
                                 calcMode="linear"
                                 repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
        </>
    );
}

export default LoadingSvgIcon;