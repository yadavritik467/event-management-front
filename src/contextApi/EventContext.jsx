import { createContext, useContext, useState } from "react";
import axiosInstance from "../interceptor/interceptor";

const EventContext = createContext(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [singleEvent,setSingleEvent] = useState({})

  const adminEventRegistrationApi = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        `/admin/registrations`,
        formData
      );
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const registerInEventApi = async (eventId) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/events/${eventId}/register`);
      setLoading(false);
      if (data) {
        await getAllEventsApi();
      }
      return data;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const approveUserRegistrationApi = async (eventId,status,registrationId) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/admin/registrations/${registrationId}/approve`,{status});
      setLoading(false);
      if (data) {
        await singleEventApi(eventId);
      }
      return data;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const getAllEventsApi = async () => {
    try {
      const { data } = await axiosInstance.get(`/events`);
      setAllEvents(data?.events);
    } catch (error) {
      console.log("error", error);
    }
  };
  const singleEventApi = async (eventId) => {
    try {
      const { data } = await axiosInstance.get(`/events/${eventId}`);
      setSingleEvent(data)
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const all_states = {
    loading,
    allEvents,
    singleEvent
  };

  const all_api_controllers = {
    adminEventRegistrationApi,
    getAllEventsApi,
    registerInEventApi,
    singleEventApi,
    approveUserRegistrationApi
  };

  return (
    <EventContext.Provider
      value={{
        ...all_states,
        ...all_api_controllers,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
