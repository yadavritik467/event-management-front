import {
  Bell,
  Calendar,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";
import { useEvent } from "../contextApi/EventContext";

const SideBar = () => {
  const { logoutApi, userState } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");

  const { allEvents } = useEvent();

  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "create-event",
      label: "Create Event",
      icon: Plus,
      path: "/dashboard/create-event",
    },
  ];

  const handleMenuClick = (itemId, path) => {
    setActiveItem(itemId);
    setIsMobileOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    await logoutApi();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-lg border border-white/20  p-3 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        >
          {" "}
          <X className="w-6 h-6" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          h-full w-full bg-gradient-to-b from-indigo-900/95 via-purple-900/95 to-pink-900/95 
        backdrop-blur-xl border-r border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        <div className="relative h-full flex flex-col">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">EventHub</h2>
                <p className="text-sm text-gray-300">Manage Events</p>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">
                    {" "}
                    {userState?.userNameOrEmail}{" "}
                  </h3>
                  <p className="text-gray-300 text-xs">{userState?.role}</p>
                </div>
                <button className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id, item.path)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-400/50 shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive
                          ? "text-purple-300"
                          : "text-gray-400 group-hover:text-purple-300"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold text-sm mb-3">
                Quick Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">Total Events</span>
                  <span className="text-white font-bold text-sm">
                    {allEvents?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 border border-red-500/30 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area Spacer (for layout purposes) */}
      <div className="hidden lg:block w-80 flex-shrink-0"></div>
    </>
  );
};

export default SideBar;
