export const setCookie = (cookieName, value) => {
  var date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = cookieName + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
};

export const getCookie = (cookieName) => {
  var value = document.cookie.match("(^|;) ?" + cookieName + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

export const deleteCookie = (cookieName) => {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
