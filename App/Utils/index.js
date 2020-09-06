const easyTime = (time, inSeconds = false) => {
  let t;
  if (inSeconds) {
    t = new Date(null);
    t.setTime(time * 1000);
  } else {
    t = new Date(time);
  }
  return `${t.toLocaleDateString('en-GB', {
    month: 'short',
  })} ${t.getDate()}, ${t.toTimeString().split(' ')[0].slice(0, 5)}`;
};

const calculateTotal = (cart) => {
  let total = Object.values(cart)
    .map((product) => Number(product.price.replace(',', '')))
    .reduce((accumulator, value) => accumulator + value);
  total = new Intl.NumberFormat('en-IN').format(total);
  return total;
};

const randomId = () => {
  return '_' + Math.random().toString(36).substr(2, 8);
};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

//Validation
const isNameValid = (name) => {
  if (name.length > 4) {
    return false;
  }

  return 'Name must be at least 4 non-numeric characters';
};

const isAddressValid = (address) => {
  if (address.length > 6) {
    return false;
  }

  return 'Address is too short';
};

const isPhoneValid = (phone) => {
  if (phone.length == 11) {
    return false;
  }

  return 'Phone # must be a valid Pakistani number (11 characters)';
};

const isEmailValid = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  }

  return 'Email address is invalid';
};

const isPasswordValid = (pass) => {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pass)) {
    return false;
  }

  return 'Must be 6 - 20 characters, and contain a lowercase character, an uppercase character, and a numeric digit.';
};

export default {
  easyTime,
  calculateTotal,
  randomId,
  dateDiffInDays,

  isNameValid,
  isAddressValid,
  isPhoneValid,
  isEmailValid,
  isPasswordValid,
};
