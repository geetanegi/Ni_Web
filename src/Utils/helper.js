export const convertToSelectOptions = (data, valueField, labelField) => {
  data = data || [];
  return data.map((d) => {
    return {
      label: d[labelField],
      value: d[valueField],
    };
  });
};
