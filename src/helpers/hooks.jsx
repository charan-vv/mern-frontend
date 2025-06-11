export const formatTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const useInitialValues = (data, defaultValue = "") => {
  const initialValues = ()=>{
     if (!data || !Array.isArray(data)) {
      return {};
    }

    return data?.reduce((acc, field) => {
      if (field?.name) {
        acc[field.name] = field.defaultValue ?? defaultValue;
      }
      return acc;
    }, {});
  }

  return initialValues;
};
