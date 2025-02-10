/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const NotificationPanel = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "unreadMessages") {
        setMessages((prev) => [...prev, ...data.payload]);
        setUnreadCount(data.payload.length);
      }

      if (data.type === "priceUpdate") {
        setMessages((prev) => [...prev, data.payload]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    return () => ws.close();
  }, [userId]);

  const handleTogglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    if (!isPanelOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="notification-panel">
      <button className="notification-button" onClick={handleTogglePanel}>
        Notifications {unreadCount > 0 && <span>({unreadCount})</span>}
      </button>
      {isPanelOpen && (
        <div className="panel-content">
          {messages.length === 0 ? (
            <p className="no-notifications">No notifications</p>
          ) : (
            <ul className="notification-list">
              {messages.map((msg, index) => (
                <li key={index} className="notification-item">
                  <p className="notification-message">{msg.message}</p>
                  <small className="notification-timestamp">
                    {msg.timeStamp}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
