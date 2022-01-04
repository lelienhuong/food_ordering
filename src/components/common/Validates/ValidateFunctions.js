import { all, email, integer } from "../../../constants/validation/regex";

export const helperMessage = (
  testRegex,
  validateField,
  setValidateField,
  typeInput
) => {
  if (testRegex) {
    let d = validateField;
    d[typeInput].isError = false;
    d[typeInput].message = null;
    setValidateField({ ...d });
  } else {
    let d = validateField;
    d[typeInput].isError = true;
    d[typeInput].message = `Please input correct ${typeInput} field`;
    setValidateField({ ...d });
  }
};
export const validate = (e, validateField, setValidateField, require, type) => {
  let value = e.target.value;
  let typeInput = e.target.name;
  if (typeof require === "undefined") {
    let d = validateField;
    d[typeInput].isError = false;
    d[typeInput].message = null;
    setValidateField({ ...d });
  } else {
    if (value.length === 0) {
      let d = validateField;
      d[typeInput].isError = true;
      d[typeInput].message = "This field is required";
      setValidateField({ ...d });
    } else {
      switch (type) {
        case "email":
          const regexEmail = email;
          helperMessage(
            regexEmail.test(String(value).toLowerCase()),
            validateField,
            setValidateField,
            typeInput
          );
          break;
        case "integer":
          const regexInteger = integer;
          helperMessage(
            regexInteger.test(String(value).toLowerCase()),
            validateField,
            setValidateField,
            typeInput
          );
          break;
        case "all":
          const regexSelect = all;
          helperMessage(
            regexSelect.test(String(value).toLowerCase()),
            validateField,
            setValidateField,
            typeInput
          );
          break;
        default:
          break;
      }
    }
  }
};

const exportedObject = {
  helperMessage,
  validate,
};

export default exportedObject;
