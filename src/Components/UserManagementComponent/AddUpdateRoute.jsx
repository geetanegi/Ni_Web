import React from "react";
import Header from "../HeaderComponent/Header";
import AddUpdateUser from "./AddUpdateUser";
import PageLayout from "../Layout/pageLayout";

const AddUpdateRoute = () => {
    return (
        <>
               <PageLayout>

                <AddUpdateUser></AddUpdateUser>
               </PageLayout>
        </>
    );
};

export default AddUpdateRoute;
