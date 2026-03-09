import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/admin/all-messages", { withCredentials: true })
      .then((res) => setMessages(res.data.data))
      .catch(() => toast.error("Failed to fetch messages"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 mt-1">Contact form submissions ({messages.length})</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No messages received yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-sm">
                      {msg.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{msg.email}</p>
                    <p className="text-xs text-gray-400">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
