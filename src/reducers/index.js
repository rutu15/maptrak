import login from "./login";
import logout from "./logout";
import common from "./common";
import customer from "./customer";
import job from "./jobs";
import driver from "./driver";
import staffUser from "./staff-user";
import rolesPermission from "./roles-permission";
import tollLocation from "./toll-location";
import trucks from "./trucks";
import trailer from "./trailer";
import holidays from "./holidays";
import profile from "./profile";
import notification from "./notification";
import forgotPassword from "./forgot-password";
import resetPassword from "./reset-password";
import onlineRequest from "./online-request";
import mapCockpit from "./mapcockpit";
import report from "./report";
import invoice from "./invoice";
import dashboard from "./dashboard";
import redirection from "./redirection";
import organisation from "./organisation";
import cto from "./cto";

const reducer = {
  login,
  logout,
  common,
  customer,
  job,
  driver,
  staffUser,
  rolesPermission,
  tollLocation,
  trucks,
  trailer,
  forgotPassword,
  resetPassword,
  profile,
  notification,
  holidays,
  onlineRequest,
  mapCockpit,
  report,
  invoice,
  dashboard,
  redirection,
  organisation,
  cto,
};
export default reducer;
