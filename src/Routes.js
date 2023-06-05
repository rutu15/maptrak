import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "@utils/theme";
import { routes } from "@utils/constant";
import {
	headerTop,
	closeMobileMenu,
	getPermissions,
} from "@utils/commonFunctions";

import PageNotFoundView from "@views/404";
import JobDetailView from "@views/job-detail";
import LoginView from "@views/login";
import JobListing from "@views/job-listing";
import DriverListing from "@views/driver-listing";
import DriverDetail from "@views/driver-detail";
import CustomerDetail from "@views/customer-detail";
import CustomerListing from "@views/customer-listing";
import Dashboard from "@views/dashboard";
import ForgotPassword from "@views/forgot-password";
import ResetPassword from "@views/reset-password";
import ProfileView from "@views/settings/account";
import NotificationView from "@views/settings/notifications";
import TrucksView from "@views/settings/trucks";
import TollLocation from "@views/settings/toll-location";
import HolidaysView from "@views/settings/holidays";
import PrivateRoute from "@utils/privateRoute";
import TrailerView from "@views/settings/trailer";
import MapCockpitView from "@views/mapCockpit";
import OnlineRequestView from "@views/online-request";
import OnlineRequestDetail from "@views/online-request-detail";
import StaffUserView from "@views/settings/staff-user";
import RolesPermissionView from "@views/settings/roles-permission";
import Invoice from "@views/invoice";
import InvoiceDetail from "@views/invoice-detail";
import VerifyEmail from "@views/verify-email";
import ApprovedInvoice from "@views/approved-invoice";
import MIVInvoice from "@views/MIV-invoice";
import CreditListing from "@views/credit-listing";
import ApprovedCredit from "@views/approved-credit";
import Report from "@views/report";
import Organisation from "@views/settings/wymap-organisation";
import RejectedInvoice from "@views/rejected-invoice";
import ManagementDashboard from "@views/management-dashboard";
import CTOS from "@views/settings/cto";
import MyOrganisation from "@views/settings/my-organisation";
import OfflineJobListing from "@views/offline-jobs";
import OfflineJobDetail from "@views/offline-job-detail";

const usePaddingUpdater = () => {
	const location = useLocation();
	useEffect(() => {
		headerTop();
		closeMobileMenu();
		window.scrollTo(0, 0);
	}, [location]);
};

const UpdateWrapper = () => {
	usePaddingUpdater();
	return (
		<Switch>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("dashboard")}
				exact
				path="/"
				component={Dashboard}
			/>
			<Route exact path={routes.login} component={LoginView} />
			<Route exact path={routes.forgotPassword} component={ForgotPassword} />
			<Route exact path={routes.resetPassword} component={ResetPassword} />
			<Route exact path={routes.verifyEmail} component={VerifyEmail} />
			<PrivateRoute
				authed={true}
				exact
				path={routes.credit}
				component={CreditListing}
			/>
			<PrivateRoute
				authed={true}
				exact
				path={routes.approvedCredit}
				component={ApprovedCredit}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("report")}
				exact
				path={routes.report}
				component={Report}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("trailer")}
				exact
				path={routes.trailer}
				component={TrailerView}
			/>
			<PrivateRoute
				exact
				authed={getPermissions() && getPermissions().includes("driver")}
				path={routes.driverListing}
				component={DriverListing}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("driver")}
				exact
				path={`${routes.driverDetail}/:id`}
				component={DriverDetail}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("invoice")}
				exact
				path={routes.invoice}
				component={Invoice}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("invoice")}
				exact
				path={`${routes.invoiceDetail}/:id`}
				component={InvoiceDetail}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("invoice")}
				exact
				path={routes.approvedInvoice}
				component={ApprovedInvoice}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("invoice")}
				exact
				path={routes.rejectedInvoice}
				component={RejectedInvoice}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("invoice")}
				exact
				path={routes.mivInvoice}
				component={MIVInvoice}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("customer")}
				exact
				path={`${routes.customerDetail}/:id`}
				component={CustomerDetail}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("customer")}
				exact
				path={routes.customerListing}
				component={CustomerListing}
			/>
			<PrivateRoute
				authed={true}
				exact
				path={routes.myProfile}
				component={ProfileView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("notification")}
				exact
				path={routes.notifications}
				component={NotificationView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("truck")}
				exact
				path={routes.trucks}
				component={TrucksView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("tollLocation")}
				exact
				path={routes.tollLocation}
				component={TollLocation}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("dashboard")}
				exact
				path={routes.dashboard}
				component={Dashboard}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("dashboard")}
				exact
				path={routes.managementDashboard}
				component={ManagementDashboard}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("job")}
				exact
				path={routes.jobListing}
				component={JobListing}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("job")}
				exact
				path={`${routes.jobDetail}/:id`}
				component={JobDetailView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("job")}
				exact
				path={routes.offlineJobListing}
				component={OfflineJobListing}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("job")}
				exact
				path={`${routes.offlineJobDetail}/:id`}
				component={OfflineJobDetail}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("mapCockpit")}
				exact
				path={routes.mapCockpit}
				component={MapCockpitView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("onlineRequest")}
				exact
				path={routes.onlineRequest}
				component={OnlineRequestView}
			/>

			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("onlineRequest")}
				exact
				path={`${routes.onlineRequestDetail}/:id`}
				component={OnlineRequestDetail}
			/>

			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("holiday")}
				exact
				path={routes.holidays}
				component={HolidaysView}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("rolePermission")}
				exact
				path={routes.rolesPermission}
				component={RolesPermissionView}
			/>
			<PrivateRoute
				authed={true}
				exact
				path={routes.organisation}
				component={Organisation}
			/>
			<PrivateRoute
				authed={getPermissions() && getPermissions().includes("user")}
				exact
				strict={true}
				path={routes.staffUsers}
				component={StaffUserView}
			/>
			<PrivateRoute
				authed={true}
				exact
				strict={true}
				path={routes.ctos}
				component={CTOS}
			/>
			<PrivateRoute
				authed={true}
				exact
				strict={true}
				path={routes.myOrganisation}
				component={MyOrganisation}
			/>

			<Route exact path={routes.pageNotFound} component={PageNotFoundView} />
			<Redirect to={routes.pageNotFound} />
		</Switch>
	);
};

const Routes = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<UpdateWrapper />
			</Router>
		</ThemeProvider>
	);
};
export default Routes;
