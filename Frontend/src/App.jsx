import React, { useState } from "react";
import SimilarProducts from "./ProductCard.jsx";
import ControlPanel from "./ControlPanel.jsx";

const App = () => {
  const [widgetConfig, setWidgetConfig] = useState({
    apiEndpoint: "",
    productId: "",
    numberOfItems: 6,
  });

  const updateConfig = (config) => {
    setWidgetConfig(config);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      <ControlPanel onUpdateConfig={updateConfig} />
      {widgetConfig.productId && (
        <SimilarProducts
          productId={widgetConfig.productId}
          numberOfItems={widgetConfig.numberOfItems}
        />
      )}
    </div>
  );
};

export default App;
