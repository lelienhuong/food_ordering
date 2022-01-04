export const email =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const integer = /^[0-9]\d*$/;
export const all = /^.{1,50}$/;

const exportedObject = {
  email,
  all,
  integer,
};

export default exportedObject;
