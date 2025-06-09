import {
  Calendar,
  Clock,
  FileText,
  Save,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useEvent } from "../../contextApi/EventContext.jsx";
import { validateFormInput } from "../../utils/utils.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditEvent = () => {
  const params = useParams();
  const {
    singleEventApi,
    adminEditEventRegistrationApi,
    singleEvent,
    loading,
  } = useEvent();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    capacity: 1,
    date: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = validateFormInput(formData);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await adminEditEventRegistrationApi(params?.eventId,formData);
  };

  useEffect(() => {
    if (params?.eventId) {
      singleEventApi(params?.eventId);
    }
  }, [params?.eventId]);

  useEffect(() => {
    if (singleEvent?.event) {
      let { _id, date, ...rest } = singleEvent?.event; 

      const formattedDate = date
        ? new Date(date).toISOString().split("T")[0]
        : "";

      setFormData({
        ...rest,
        date: formattedDate,
      });
    }
  }, [singleEvent?.event]);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 ">
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-3xl">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-3xl font-bold text-white mb-3">
            Edit Event
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Fill in the details below to edit an amazing event that people will
            love to attend
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="space-y-8">
              {/* Event Title */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-400/30">
                    <Sparkles className="w-5 h-5 text-purple-300" />
                  </div>
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-6 py-2 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-lg ${
                    errors.title
                      ? "border-red-400 focus:ring-red-400"
                      : "border-white/20 focus:ring-purple-400"
                  }`}
                  placeholder="Enter a catchy title for your event..."
                  required
                />
                {errors.title && (
                  <p className="text-red-300 text-sm flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Event Description */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white flex items-center gap-3">
                  <div className="bg-pink-500/20 p-2 rounded-lg border border-pink-400/30">
                    <FileText className="w-5 h-5 text-pink-300" />
                  </div>
                  Event Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-6 py-2 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-lg resize-none ${
                    errors.description
                      ? "border-red-400 focus:ring-red-400"
                      : "border-white/20 focus:ring-purple-400"
                  }`}
                  placeholder="Describe what makes your event special and what attendees can expect..."
                  required
                />
                {errors.description && (
                  <p className="text-red-300 text-sm flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Event Date and Capacity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Date */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-white flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-400/30">
                      <Clock className="w-5 h-5 text-indigo-300" />
                    </div>
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-6 py-2 bg-white/10 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-lg ${
                      errors.date
                        ? "border-red-400 focus:ring-red-400"
                        : "border-white/20 focus:ring-purple-400"
                    }`}
                    required
                  />
                  {errors.date && (
                    <p className="text-red-300 text-sm flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Event Capacity */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-white flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg border border-green-400/30">
                      <Users className="w-5 h-5 text-green-300" />
                    </div>
                    Event Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    max="10000"
                    className={`w-full px-6 py-2 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-lg ${
                      errors.capacity
                        ? "border-red-400 focus:ring-red-400"
                        : "border-white/20 focus:ring-purple-400"
                    }`}
                    placeholder="Maximum attendees"
                    required
                  />
                  {errors.capacity && (
                    <p className="text-red-300 text-sm flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-1 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${
                    loading
                      ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      Edit Event
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
