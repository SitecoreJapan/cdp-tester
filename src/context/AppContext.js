import { createContext } from 'react';

let context;
export default function getAppContext(defaultValue) {
    if(context) return context;
    context = createContext(defaultValue);
    return context;
}