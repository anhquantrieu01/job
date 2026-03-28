"use client";

import { FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getMyNotifications, markAsRead } from "@/actions/notifications";
import { Notification } from "@/generated/prisma/client";


export default function UserNotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyNotifications();
      setNotifications(data);
    };
    fetchData();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      {/* 🔔 Bell */}
      <button onClick={() => setOpen(!open)} className="relative">
        <FiBell className="text-xl" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 🔔 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white p-4 shadow z-50">
          <p className="text-sm font-semibold text-green-600">Thông báo</p>

          <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-sm text-gray-500">
                Chưa có thông báo
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={async () => {
                  await markAsRead(n.id);

                  setNotifications((prev) =>
                    prev.map((item) =>
                      item.id === n.id
                        ? { ...item, isRead: true }
                        : item
                    )
                  );
                }}
                className={`cursor-pointer rounded-lg p-3 text-sm transition ${n.isRead ? "bg-gray-50" : "bg-blue-50"
                  }`}
              >
                <p className="font-medium">{n.title}</p>
                <p className="text-gray-600">{n.message}</p>

                {/* 👉 badge theo type */}
                <span className="mt-1 inline-block text-xs text-gray-400">
                  {n.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}