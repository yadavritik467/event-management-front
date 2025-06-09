
export const validateFormInput = (formData) => {
  const newErrors = {};
  if (!formData.title.trim()) {
    newErrors.title = "Event title is required";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Event description is required";
  }

  if (!formData.date) {
    newErrors.date = "Event date is required";
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.date = "Event date cannot be in the past";
    }
  }

  if (formData.capacity < 1) {
    newErrors.capacity = "Capacity must be at least 1";
  }
  return newErrors;
};


export const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

 