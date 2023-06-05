import API from "@services/axios";
import moment from "moment-timezone";


const headerTop = () => {
  var wrapper = document.querySelector(".wrapper");
  if (wrapper !== null) {
    var header_h = document.getElementById("header").offsetHeight;
    wrapper.style.paddingTop = header_h + "px";
  }
};

const closeMobileMenu = () => {
  document.body.classList.remove("open-menu");
};

const setUserId = (data) => {
  localStorage.setItem("id", data);
};

const getUserId = () => {
  return localStorage.getItem("id");
};

const setUserData = (data) => {
  localStorage.setItem("data", data);
};

const getUserData = () => {
  return localStorage.getItem("data");
};

const removeUserData = () => {
  return localStorage.removeItem("data");
};

const setFilter = (filter, data, stringfy) => {
  if (stringfy) return localStorage.setItem(filter, JSON.stringify(data));
  else return localStorage.setItem(filter, data);
};
const getFilter = (filter, parse) => {
  if (parse) {
    return JSON.parse(localStorage.getItem(filter));
  } else {
    return localStorage.getItem(filter);
  }
};

const removeFilter = (filter) => {
  return localStorage.removeItem(filter);
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  return localStorage.removeItem("token");
};

const setPermissions = (permission) => {
  localStorage.setItem("permissions", permission);
};

const getPermissions = () => {
  const permissions = localStorage.getItem("permissions");
  const data = permissions !== null && permissions.split(",");
  return data;
};

const removePermissions = () => {
  return localStorage.removeItem("permissions");
};

const allowOnlyNumbers = (event) => {
  if (event.key.length === 1 && /\D/.test(event.key)) {
    event.preventDefault();
  }
};

function requestStatusColors(data) {
  var color;
  switch (data) {
    case "Requested":
      color = "requested";
      break;
    case "Acknowledged":
      color = "acknowledged";
      break;
    case "Driver Assigned":
      color = "driver-assigned";
      break;
    case "Request Completed":
      color = "request-completed";
      break;

    default:
      color = "#e40000";
      break;
  }
  return color;
}

const dashboardRequestStatusColors = (data) => {
  var color;
  switch (data) {
    case "Not Assigned":
      color = "not-assigned";
      break;
    case "Completed":
      color = "completed";
      break;
    case "Rejected":
      color = "rejected";
      break;
    case "In Transit":
      color = "in-progress";
      break;
    case " Lodgement":
      color = "in-progress";
      break;
    case "Loading":
      color = "in-progress";
      break;
    case "Unloading":
      color = "in-progress";
      break;
    case "Assigned":
      color = "assigned";
      break;
    case "Review Completed":
      color = "review-completed";
      break;

    default:
      color = "#e40000";
      break;
  }
  return color;
};

const dashboardRequestbButtonStyle = (data) => {
  var button;
  switch (data) {
    case "Not Assigned":
      button = "re-assign";
      break;
    case "Complete":
      button = "assign-driver";
      break;
    case "Rejected":
      button = "assign-driver";
      break;
    case "In Progress":
      button = "re-assign";
      break;

    default:
      button = "#e40000";
      break;
  }
  return button;
};

const jobListingRequestStyle = (data) => {
  var button;
  switch (data) {
    case "Assign Driver":
      button = "assign-driver";
      break;
    case "Re-Assign":
      button = "re-assign";
      break;
    default:
      button = "#e40000";
      break;
  }
  return button;
};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getCustomDate = (to, from) => {
  const toDate = `${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`;
  const fromDate = `${from.getDate()}/${
    from.getMonth() + 1
  }/${from.getFullYear()}`;

  return `${toDate} - ${fromDate}`;
};

const getCustomFormToDate = (to, from) => {
  const toDate = moment(to).format("YYYY/MM/DD");
  const fromDate = moment(from).format("YYYY/MM/DD");
  return `${toDate} - ${fromDate}`;
};
function hasDecimalPlace(value, x) {
  var pointIndex = value.indexOf(".");
  return pointIndex >= 0 && pointIndex < value.length - x;
}
const allowOnlyFloat = (e) => {
  var newValue = e.target.value;
  if (hasDecimalPlace(newValue, 2) === false) {
    var ASCIICode = e.which ? e.which : e.keyCode;
    if (ASCIICode === 46) {
      if (newValue.split(".").length > 1 || e.target.selectionStart === 0) {
        e.preventDefault();
        e.returnValue = false;
      } else {
      }
    } else if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
    e.returnValue = false;
  }
};
const allowOnlyFloatFour = (e) => {
  var newValue = e.target.value;
  if (hasDecimalPlace(newValue, 4) === false) {
    var ASCIICode = e.which ? e.which : e.keyCode;
    if (ASCIICode === 46) {
      if (newValue.split(".").length > 1 || e.target.selectionStart === 0) {
        e.preventDefault();
        e.returnValue = false;
      } else {
      }
    } else if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
    e.returnValue = false;
  }
};
const allowNegativeOnlyFloat = (e) => {
  var newValue = e.target.value;
  if (hasDecimalPlace(newValue, 2) === false) {
    var ASCIICode = e.which ? e.which : e.keyCode;
    if (ASCIICode === 46) {
      if (newValue.split(".").length > 1 || e.target.selectionStart === 0) {
        e.preventDefault();
        e.returnValue = false;
      } else {
      }
    } else if (
      ASCIICode > 45 &&
      ASCIICode > 31 &&
      (ASCIICode < 48 || ASCIICode > 57)
    ) {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
    e.returnValue = false;
  }
};
const allowOnlyCharacters = (event) => {
  var ASCIICode = event.charCode;
  if (
    (ASCIICode >= 65 && ASCIICode <= 90) ||
    (ASCIICode >= 97 && ASCIICode <= 122) ||
    ASCIICode === 32
  ) {
  } else {
    event.preventDefault();
  }
};

const allowAlphaNumeric = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[a-z\d\-_\s]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
  }
};

const allowNumberWithSpaceValidation = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[\d\-\s]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
  }
};

const awbNumberValidation = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[\d\-\s]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
    e.target.value = e.target.value
      .replace(/[^\d]/g, "")
      .replace(/(.{3})/, "$1-")
      .trim();
  }
};

const allowOnlyAlphaNumericNoSpecialChar = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[a-z\d]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
  }
};

const allowSomeSpecialChar = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[)(a-z\d\-_,.:;'°&/\s]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
  }
};

const pathValidation = (e) => {
  var keyCode = e.keyCode || e.which;
  var pattern = /^[)(a-z\d:/\s]+$/i;
  var isValid = pattern.test(String.fromCharCode(keyCode));
  if (!isValid) {
    e.preventDefault();
  } else {
  }
};

function convertMinutesToHours(value) {
  var Hours = Math.floor(value / 60);
  var minutes = value % 60;
  return `${Hours} : ${minutes}`;
}
function averageMinutesToHours(value) {
  var Hours = parseFloat(value / 60).toFixed(2);
  var minutes = value % 60;
  return `${Hours} : ${minutes}`;
}
const uploadImage = (event, mimeType, bucketType) => {
  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files.length) {
      var reader = new FileReader();
      reader.onload = function () {
        API.post("getPreSignedURL", {
          fileName: event.target.files[0].name?.replace(" ", ""),
          mimeType: mimeType,
          bucketType: bucketType,
        })
          .then((response) => {
            fetch(response.data.data.preSignedUrl, {
              method: "PUT",
              body: new Blob([reader.result], {
                type: mimeType,
              }),
            })
              .then(() => {
                resolve(response.data);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      };
      reader.readAsArrayBuffer(event.target.files[0]);
    }
  });
};
const UploadFile = (event, fileName, defaultText, mimeType, bucketType) => {
  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      document.getElementById(fileName).innerHTML = file.name;
      var reader = new FileReader();
      reader.onload = function () {
        API.post("getPreSignedURL", {
          fileName: event.target.files[0].name?.replace(" ", ""),
          mimeType: mimeType,
          bucketType: bucketType,
        })
          .then((response) => {
            fetch(response.data.data.preSignedUrl, {
              method: "PUT",
              body: new Blob([reader.result], {
                type: mimeType,
              }),
            })
              .then(() => {
                resolve(response.data);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      };
      reader.readAsArrayBuffer(event.target.files[0]);
    } else {
      document.getElementById(fileName).innerHTML = defaultText;
    }
  });
};
const utcToLocal = (time, timezone, format) => {
  if (time) {
    let localTime = moment.tz(time, timezone).format(format);
    return localTime;
  }
  return "";
};

const utcToLocalTime = (time, timezone, format) => {
    const formatedTime = moment.tz(time, timezone).format("YYYY/MM/DD HH:mm:ss")
    if (time) {
      return formatedTime;
    }
    return "";
  };

const utcToTimezone = (time, timezone, format) => {
  if (time && format) {
    let localTime = moment.tz(time, timezone).format(format);
    return localTime;
  }
  return;
};
export {
  headerTop,
  setToken,
  getToken,
  removeToken,
  dashboardRequestStatusColors,
  dashboardRequestbButtonStyle,
  jobListingRequestStyle,
  allowOnlyNumbers,
  closeMobileMenu,
  makeid,
  requestStatusColors,
  getCustomDate,
  allowOnlyFloat,
  allowOnlyCharacters,
  convertMinutesToHours,
  UploadFile,
  setPermissions,
  getPermissions,
  removePermissions,
  getCustomFormToDate,
  setUserData,
  getUserData,
  removeUserData,
  allowAlphaNumeric,
  allowSomeSpecialChar,
  allowOnlyAlphaNumericNoSpecialChar,
  awbNumberValidation,
  uploadImage,
  setUserId,
  getUserId,
  utcToLocal,
  utcToLocalTime,
  averageMinutesToHours,
  setFilter,
  getFilter,
  removeFilter,
  allowOnlyFloatFour,
  allowNegativeOnlyFloat,
  utcToTimezone,
  pathValidation,
  allowNumberWithSpaceValidation,
};
