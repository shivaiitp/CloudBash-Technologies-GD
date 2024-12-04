import React from "react";
import Widget from "./Widget";

const DemoPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Demo Page</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Myntra Widget */}
        <Widget widgetId="myntra" productId="12345" />

        {/* Meesho Widget */}
        <Widget widgetId="meesho" productId="2258384" />
      </div>
    </div>
  );
};

export default DemoPage;
