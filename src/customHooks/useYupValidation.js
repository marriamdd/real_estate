import { useState } from "react";
import * as yup from "yup";

const useYupValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validateForm = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const yupErrors = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(yupErrors);
      return false;
    }
  };

  return { errors, validateForm };
};
export default useYupValidation;
