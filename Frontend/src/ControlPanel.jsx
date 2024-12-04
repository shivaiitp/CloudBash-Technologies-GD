import React, { useState } from "react";

const ControlPanel = ({ onUpdateConfig }) => {
  const [config, setConfig] = useState({
    apiEndpoint: "http://localhost:5000/api/recommendations/",
    productId: "",
    numberOfItems: 6,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdateConfig(config);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">Control Panel</h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">API Endpoint</label>
          <input
            type="text"
            name="apiEndpoint"
            value={config.apiEndpoint}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product ID</label>
          <input
            type="text"
            name="productId"
            value={config.productId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Number of Items</label>
          <input
            type="number"
            name="numberOfItems"
            value={config.numberOfItems}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Widget
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
