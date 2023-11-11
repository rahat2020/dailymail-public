import React from 'react';

const Documentations = () => {
    return (
        <div className='container'>
            <div className=" d-flex flex-column justify-content-center align-items-center my-5 p-2 shadow rounded">
              
                    <iframe
                        className="embed-responsive-item"
                        src="https://docs.google.com/document/d/e/2PACX-1vRyPzWlmhV2wItAEXHPAZ2lFT9SMl1Vz2FmbCb9nPaSVpCDI4uH2daqNdEbw9fv82p68_FwurTAamKa/pub?embedded=true"
                        allowFullScreen
                        title="Documentation"
                    ></iframe>
                
            </div>
        </div>
    );
};

export default Documentations;
