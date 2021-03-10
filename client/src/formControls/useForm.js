import { useEffect, useState } from "react";

const useForm = (cb, formValidate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      cb();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(formValidate(values));
    setIsSubmit(true);
    // cb();
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
