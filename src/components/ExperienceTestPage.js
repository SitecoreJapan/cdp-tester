import {useState} from 'react';

function ExperienceTestPage(props) {
    let urlParams = new window.URLSearchParams(window.document.location.search.substring(1));
    const [parameters, setParameters] = useState({
        divID: urlParams.get("divID")
    });
    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-8 sm:px-0">
                    {(() => {
                       if(parameters.divID) {
                           return <div id={parameters.divID} className="border-4 border-dashed border-gray-200 rounded-lg h-96" />;
                       }
                    })()}
                </div>
            </div>
        </>
    );
}

export default ExperienceTestPage;