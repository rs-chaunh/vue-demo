function capitalizeFirstLetter(string) {
  const arrayWords = string.split(" ");
  const uppercaseArrayWords = arrayWords.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1)
  );
  return uppercaseArrayWords.join(" ");
}

export function checkErrors(field, message, rule, valueRule = "") {
  const value = field.value;
  switch (rule) {
    case "isRequired":
      {
        if (value.length === 0) field.error = message;
        else field.error = "";
      }
      break;
    case "isEmail":
      {
        if (value.length > 0) {
          if (
            value.indexOf("@") < 1 ||
            value.lastIndexOf(".") < 1 ||
            value.length - value.lastIndexOf(".") < 2 ||
            value.lastIndexOf(".") - value.indexOf("@") < 2
          ) {
            field.error = message;
          } else {
            field.error = "";
          }
        }
      }
      break;
    case "capitalizeText":
      {
        if (value.length !== 0) {
          if (capitalizeFirstLetter(value) !== value)
            field.error = message;
          else field.error = "";
        }
      }
      break;
    case "minLength":
      {
        if (value.length !== 0) {
          if (value.length <= valueRule) field.error = message;
          else field.error = "";
        }
      }
      break;

    case "maxLength":
      {
        if (value.length !== 0) {
          if (value.length >= valueRule) field.error = message;
          else field.error = "";
        }
      }
      break;
    case "isNumber":
      {
        if (value.length !== 0) {
          if (value <= 0) field.error = message;
          else field.error = "";
        }
      }
      break;
  }
}
