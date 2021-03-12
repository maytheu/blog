export default function formValidation(values) {
    let isValid = true;
    if (values.password) {
      isValid = values.password.length >= 8 && isValid;
    }
    if (values.amount) {
      isValid = !isNaN(values.amount) && isValid;
    }
    if (values.phone) {
      isValid = !isNaN(values.phone) && isValid;
    }
    return isValid;
  }
  