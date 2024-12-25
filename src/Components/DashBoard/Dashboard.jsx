import React, { useEffect, useState } from "react";
import PageLayout from "../Layout/pageLayout";
import { Spin } from "antd";

const Dashboard = () => {
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight - 145);
  const [loading, setLoading] = useState(true); // State to track loading state of iframe

  // Function to hide spinner when iframe is loaded
  const handleIframeLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    function handleResize() {
      setIframeHeight(window.innerHeight - 145);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PageLayout>
      <div>
      {loading && <Spin size="large" tip="Loading..." fullscreen={true} />}
        <iframe
          src="https://embed.lumenore.com/Nutritional_International/#/embed/ea3a0ac0-f0c5-11ee-81e9-176f8035776f"
          width='100%'
          height={iframeHeight}
          onLoad={handleIframeLoad} 
        ></iframe>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
