import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../contextApi/EventContext";

import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Edit,
  Filter,
  Mail,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { getStatusColor } from "../../utils/utils";

const SingleEvent = () => {
  const { singleEventApi, approveUserRegistrationApi, singleEvent } =
    useEvent();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.eventId) {
      singleEventApi(params?.eventId);
    }
  }, [params?.eventId]);

  const [statusFilter, setStatusFilter] = useState("all");

  const handleStatusChange = async (registrationId, newStatus) => {
    await approveUserRegistrationApi(
      params?.eventId,
      newStatus,
      registrationId
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRegistrations = singleEvent?.registrations?.filter(
    (reg) => statusFilter === "all" || reg.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-6 lg:p-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Event Details Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-2xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {singleEvent?.event?.title}
                  </h1>
                  <p className="text-gray-300 text-lg">Event Management</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {singleEvent?.event?.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-pink-300" />
                    <div>
                      <p className="text-sm text-gray-300">Capacity</p>
                      <p className="text-white font-semibold">
                        {singleEvent?.event?.capacity} People
                      </p>
                      <p className="text-sm text-pink-300">
                        {singleEvent?.registrations?.length} Registered
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="text-white font-semibold">Active</p>
                      <p className="text-sm text-green-300">
                        Taking Registrations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  navigate(`/dashboard/edit-event/${params?.eventId}`)
                }
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit Event
              </button>
              <button className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Registrations
                </h2>
                <p className="text-gray-300">
                  Manage event registrations and approvals
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Filter className="w-5 h-5" />
                  <span className="text-sm">Filter:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="all" className="bg-gray-800">
                    All Status
                  </option>
                  <option value="approve" className="bg-gray-800">
                    Approved
                  </option>
                  <option value="reject" className="bg-gray-800">
                    Rejected
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    User
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Contact
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations?.map((registration, index) => (
                  <tr
                    key={registration?._id}
                    className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            ID: {registration?.userId?._id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-6 h-6" />
                        <span className="text-sm">
                          {registration?.userId?.userNameOrEmail}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          registration?.status
                        )}`}
                      >
                        {getStatusIcon(registration?.status)}
                        <span className="capitalize">
                          {registration?.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <select
                          value={registration?.status}
                          onChange={(e) =>
                            handleStatusChange(
                              registration?._id,
                              e.target.value
                            )
                          }
                          className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 backdrop-blur-sm text-sm"
                        >
                          <option value="pending" className="bg-gray-800">
                            Pending
                          </option>
                          <option value="approve" className="bg-gray-800">
                            Approve
                          </option>
                          <option value="reject" className="bg-gray-800">
                            Reject
                          </option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRegistrations?.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No Registrations Found
              </h3>
              <p className="text-gray-300">
                {statusFilter === "all"
                  ? "No one has registered for this event yet."
                  : `No ${statusFilter} registrations found.`}
              </p>
            </div>
          )}

          {/* Table Footer */}
          {filteredRegistrations?.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-300 text-sm">
                  Showing {filteredRegistrations?.length} of{" "}
                  {singleEvent?.registrations?.length} registrations
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-300">
                        Pending:{" "}
                        {
                          singleEvent?.registrations.filter(
                            (r) => r.status === "pending"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">
                        Approved:{" "}
                        {
                          singleEvent?.registrations.filter(
                            (r) => r.status === "approve"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">
                        Rejected:{" "}
                        {
                          singleEvent?.registrations.filter(
                            (r) => r.status === "reject"
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
