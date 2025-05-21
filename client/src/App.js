import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const source = new EventSource("http://localhost:4000/sse");

    source.onopen = () => {
      console.log("✅ SSE соединение открыто");
    };

    source.onmessage = (event) => {
      console.log("📨 Пришло сообщение:", event.data);
      const data = JSON.parse(event.data);
      setEvents((prev) => [...prev, data]);
    };

    source.onerror = (err) => {
      console.error("❌ SSE ошибка:", err);
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <h1>События (SSE)</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
