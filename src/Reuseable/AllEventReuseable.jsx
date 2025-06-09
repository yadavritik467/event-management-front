import { Calendar, Clock, Edit2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";
import { useEvent } from "../contextApi/EventContext";

const AllEventReuseable = ({ title, allEvents }) => {
  const { registerInEventApi, loading } = useEvent();

  const { userState } = useAuth();

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleEventAction = async (eventId, action) => {
    if (action === "register") {
      await registerInEventApi(eventId);
      return;
    } else if (action === "view") {
      return navigate(`/dashboard/single-event/${eventId}`);
    } else if (action === "share") {
      return navigate(`/dashboard/edit-event/${eventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  {title ?? ""}
                </h1>
                <p className="text-gray-300">
                  Discover amazing events happening around you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => {
              const eventDate = formatDate(event?.date);
              const availableSpots = event?.availableCount || event?.capacity;

              return (
                <div
                  key={event?._id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                >
                  {/* Event Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl p-3 border border-purple-400/30">
                        <div className="text-center">
                          <div className="text-xs text-purple-300 font-medium">
                            {eventDate?.day}
                          </div>
                          <div className="text-xl font-bold text-white">
                            {eventDate?.date}
                          </div>
                          <div className="text-xs text-purple-300 font-medium">
                            {eventDate?.month}
                          </div>
                        </div>
                      </div>
                      {userState?.role === "admin" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEventAction(event?._id, "share")
                            }
                            className="p-2 rounded-lg bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {event?.title}
                    </h3>

                    {/* Event Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {event?.description}
                    </p>

                    {/* Event Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {availableSpots}/{event?.capacity}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{eventDate?.time}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event?.eventFull
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-green-500/20 text-green-300 border border-green-500/30"
                        }`}
                      >
                        {event?.eventFull ? "Full" : "Available"}
                      </span>
                      {event?.registeredInEvent && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Registered
                        </span>
                      )}
                      {event?.bookedInEvent && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Booked
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {!event?.registeredInEvent && !event?.eventFull && (
                        <button
                          onClick={() =>
                            handleEventAction(event?._id, "register")
                          }
                          disabled={loading || event?.bookedInEvent}
                          className={`${
                            event?.bookedInEvent ? "opacity-40" : ""
                          } flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm`}
                        >
                          {loading ? (
                            <div className="flex justify-center">
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            "Register"
                          )}
                        </button>
                      )}
                      {userState?.role === "admin" && (
                        <button
                          onClick={() => handleEventAction(event?._id, "view")}
                          className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {allEvents?.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md mx-auto">
                <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No Events Found
                </h3>
                <p className="text-gray-300 mb-4">
                  Try adjusting your search or filters
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEventReuseable;
