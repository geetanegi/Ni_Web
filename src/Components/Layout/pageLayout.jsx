import React from "react";
import Header from "../HeaderComponent/Header";

const PageLayout = ({ pageTitle, children }) => {
    console.log('-------------pageteind=====', pageTitle)
    return (
        <>
            {/* {pageTitle!==undefined && ( */}
                <Header />
            {/* // )} */}

            <div className="main-container">
                {children}
            </div>
        </>
    );
};

export default PageLayout;
