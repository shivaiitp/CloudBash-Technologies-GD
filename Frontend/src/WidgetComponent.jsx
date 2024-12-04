import React, { useEffect, useState } from "react";

const Widget = ({ widgetId, productId }) => {
  const [data, setData] = useState(null);
  const [uiConfig, setUiConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/widget/${widgetId}?productId=${productId}`
        );
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
          setUiConfig(result.uiConfig);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load widget data");
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetData();
  }, [widgetId, productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={`widget ${uiConfig?.theme} ${uiConfig?.size}`}
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: uiConfig?.theme === "dark" ? "#333" : "#fff",
        color: uiConfig?.theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h3>Widget: {widgetId}</h3>
      <ul>
        {data?.items?.map((item, index) => (
          <li key={index}>
            <img src={item.image} alt={item.name} style={{ width: "50px" }} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Widget;
