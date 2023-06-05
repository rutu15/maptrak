import React, { useState, useEffect } from "react";
import { Button, AppBar } from "@material-ui/core";
import { useHistory, Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ExpandMore } from "@material-ui/icons";
import cx from "classnames";

import siteLogo from "@assets/images/logo-white.svg";
import backArrow from "@assets/images/back-arrow.svg";
import call from "@assets/images/call.svg";
import HomeIcon from "@assets/images/home-icon.svg";
import { routes } from "@utils/constant";

import {
	headerTop,
	getToken,
	getPermissions,
	removeFilter,
	setFilter,
} from "@utils/commonFunctions";
import { HeaderStyle } from "./style";
import MenuPopup from "./menuPopup";

function Header() {
	const location = useLocation();
	const history = useHistory();
	const classes = HeaderStyle();

	const [activeRoute, setActiveRoute] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		setActiveRoute(location.pathname);
		if (!location.pathname.includes("customer")) removeFilter("customerCity");
		if (!location.pathname.includes("job")) {
			removeFilter("jobFilter");
			removeFilter("jobDashboardFilter");
			removeFilter("jobAllocate");
			removeFilter("cargoVolume");
		}
		if (!location.pathname.includes("driver")) {
			removeFilter("driverDashboardFilter");
			removeFilter("driverFilter");
			removeFilter("jobDashboardFilter");
		}
		if (!location.pathname.includes("online-request")) {
			removeFilter("onlineRequestFilter");
		}
	}, [location]);

	// for header padding
	window.addEventListener("load", function () {
		setTimeout(() => {
			headerTop();
		}, 150);
	});
	window.addEventListener("resize", function () {
		setTimeout(() => {
			headerTop();
		}, 150);
	});

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// for mobile menu
	const openMenu = () => {
		document.body.classList.toggle("open-menu");
		var element = document.querySelectorAll("li.has-submenu");
		for (let i = 0; i < element.length; i++) {
			element[i].classList.remove("open-submenu");
		}
	};

	// for profile menu
	const handleClose = (val) => {
		setAnchorEl(null);
		document.body.classList.remove("open-profile-menu");
		history.push(val);
	};
	const handleEnter = () => {
		document.body.classList.add("open-profile-menu");
	};

	// sub menu
	const subMenu = (event) => {
		event.preventDefault();
		if (window.innerWidth < 992) {
			var parentElement = event.target.closest("li.has-submenu");
			var element = document.querySelectorAll("li.has-submenu");
			for (let i = 0; i < element.length; i++) {
				if (element[i] === parentElement) {
					element[i].classList.toggle("open-submenu");
				} else {
					element[i].classList.remove("open-submenu");
				}
			}
		}
	};
	const handleAWBNumberClick = (event) => {
		event.preventDefault();
		setFilter("reportTab", 3);
		history.push(routes.report);
	};
	return (
		<div className={classes.HeaderWrapper}>
			<AppBar className="site-header" id="header">
				<div className="header-wrapper">
					<Link to={routes.dashboard} className="site-logo" title="Wymap">
						<img src={siteLogo} alt="Wymap" />
					</Link>
					<nav className="main-nav-wrapper">
						{getToken() ? (
							<div className="inner-nav-wrapper">
								<div className="main-nav-inner-wrapper">
									<ul className="main-nav">
										{getPermissions() &&
											getPermissions().includes("dashboard") && (
												<li className="has-submenu">
													<NavLink
														onClick={subMenu}
														to={routes.dashboard}
														className={cx({
															active:
																activeRoute === routes.dashboard ||
																activeRoute === routes.managementDashboard,
														})}
													>
														Dashboard
													</NavLink>
													<ExpandMore className="submenu-arrow" />
													<ul className="sub-menu">
														<li>
															<NavLink to={routes.dashboard}>
																Admin Dashboard
															</NavLink>
														</li>
														<li>
															<NavLink to={routes.managementDashboard}>
																Management Dashboard
															</NavLink>
														</li>
													</ul>
												</li>
												// <li>
												// 	<NavLink
												// 		to={routes.dashboard}
												// 		className={cx({
												// 			active:
												// 				activeRoute === "/" ||
												// 				activeRoute === routes.dashboard,
												// 		})}
												// 	>
												// 		Dashboard
												// 	</NavLink>
												// </li>
											)}
										{getPermissions() && getPermissions().includes("report") && (
											<li>
												<NavLink
													to={routes.AWBSearch}
													className={cx({
														active: activeRoute === routes.AWBSearch,
													})}
													onClick={handleAWBNumberClick}
												>
													AWB Search
												</NavLink>
											</li>
										)}
										{getPermissions() &&
											getPermissions().includes("mapCockpit") && (
												<li>
													<NavLink
														to={routes.mapCockpit}
														className={cx({
															active: activeRoute === routes.mapCockpit,
														})}
													>
														Map/Cockpit
													</NavLink>
												</li>
											)}
										{getPermissions() && getPermissions().includes("invoice") && (
											<li className="has-submenu">
												<NavLink
													onClick={subMenu}
													to={routes.invoice}
													className={cx({
														active:
															activeRoute === routes.approvedInvoice ||
															activeRoute === routes.rejectedInvoice ||
															activeRoute === routes.invoice ||
															activeRoute === routes.mivInvoice ||
															activeRoute.includes(routes.invoiceDetail),
													})}
												>
													Invoices
												</NavLink>
												<ExpandMore className="submenu-arrow" />
												<ul className="sub-menu">
													{/* <li>
                            <NavLink to={routes.approvedCredit}>
                              Approved Credit Note
                            </NavLink>
                          </li> */}
													<li>
														<NavLink to={routes.invoice}>
															Draft Invoices
														</NavLink>
													</li>
													<li>
														<NavLink to={routes.approvedInvoice}>
															Approved Invoices
														</NavLink>
													</li>
													<li>
														<NavLink to={routes.rejectedInvoice}>
															Rejected Invoices
														</NavLink>
													</li>
													<li>
														<NavLink to={routes.mivInvoice}>
															MIV Invoices
														</NavLink>
													</li>
												</ul>
											</li>
										)}

										{((getPermissions() && getPermissions().includes("job")) ||
											(getPermissions() &&
												getPermissions().includes("onlineRequest"))) && (
											<li className="has-submenu">
												<NavLink
													onClick={subMenu}
													to={routes.jobListing}
													className={cx({
														active:
															activeRoute === routes.jobListing ||
															activeRoute.includes(routes.jobDetail) ||
															activeRoute === routes.onlineRequest ||
															activeRoute === routes.offlineJobListing ||
															activeRoute.includes(routes.offlineJobDetail) ||
															activeRoute.includes(routes.onlineRequestDetail),
													})}
												>
													Jobs
												</NavLink>
												<ExpandMore className="submenu-arrow" />
												<ul className="sub-menu">
													{getPermissions() &&
														getPermissions().includes("job") && (
															<li>
																<NavLink
																	to={routes.jobListing}
																	className={cx({
																		active:
																			activeRoute === routes.jobListing ||
																			activeRoute.includes(routes.jobDetail),
																	})}
																>
																	Jobs
																</NavLink>
															</li>
														)}
													{getPermissions() &&
														getPermissions().includes("onlineRequest") && (
															<li>
																<NavLink
																	to={routes.onlineRequest}
																	className={cx({
																		active:
																			activeRoute === routes.onlineRequest ||
																			activeRoute.includes(
																				"online-request-detail"
																			),
																	})}
																>
																	Online Request
																</NavLink>
															</li>
														)}
													{getPermissions() &&
														getPermissions().includes("job") && (
															<li>
																<NavLink
																	to={routes.offlineJobListing}
																	className={cx({
																		active:
																			activeRoute ===
																				routes.offlineJobListing ||
																			activeRoute.includes(
																				routes.offlineJobDetail
																			),
																	})}
																>
																	Offline Jobs
																</NavLink>
															</li>
														)}
												</ul>
											</li>
										)}
										{/* <li className="has-submenu">
                      <NavLink
                        onClick={subMenu}
                        to={routes.credit}
                        className={cx({
                          active:
                            activeRoute === routes.credit ||
                            activeRoute === routes.approvedCredit,
                        })}
                      >
                        Credit Note
                      </NavLink>
                      <ExpandMore className="submenu-arrow" />
                      <ul className="sub-menu">
                        <li>
                          <NavLink to={routes.credit}>
                            Draft Credit Note
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={routes.approvedCredit}>
                            Approved Credit Note
                          </NavLink>
                        </li>
                      </ul>
                    </li> */}

										{getPermissions() && getPermissions().includes("customer") && (
											<li>
												<NavLink
													to={routes.customerListing}
													className={cx({
														active:
															activeRoute === routes.customerListing ||
															activeRoute.includes(routes.customerDetail),
													})}
												>
													Customers
												</NavLink>
											</li>
										)}
										{getPermissions() && getPermissions().includes("report") && (
											<li>
												<NavLink
													to={routes.report}
													className={cx({
														active: activeRoute === routes.report,
													})}
												>
													Report
												</NavLink>
											</li>
										)}
										<li>
											<NavLink
												to={routes.myProfile}
												className={cx({
													active:
														activeRoute === routes.myProfile ||
														activeRoute === routes.notifications ||
														activeRoute === routes.trucks ||
														activeRoute === routes.tollLocation ||
														activeRoute === routes.trailer ||
														activeRoute === routes.holidays ||
														activeRoute === routes.staffUsers ||
														activeRoute === routes.driverListing ||
														activeRoute.includes(routes.driverDetail) ||
														activeRoute === routes.rolesPermission ||
														activeRoute === routes.organisation ||
														activeRoute === routes.ctos,
												})}
											>
												Settings
											</NavLink>
										</li>
									</ul>
								</div>
								<div className="profile-nav-wrapper">
									<MenuPopup
										handleClick={(e) => handleClick(e)}
										handleClose={(val) => handleClose(val)}
										classes={classes}
										anchorEl={anchorEl}
										handleEnter={handleEnter}
									/>
									<div className="mob-nav-icon" onClick={openMenu}>
										<span></span>
									</div>
								</div>
							</div>
						) : (
							<div className="home-nav-wrapper">
								<ul>
									<li>
										<Button
											className="light-blue-btn primary-btn"
											variant="contained"
											color="primary"
											disableElevation
											title="Back to Wymap"
										>
											<img
												className="back-icon"
												src={backArrow}
												alt="Back to Wymap"
											/>
											<img
												className="home-icon"
												src={HomeIcon}
												alt="Back to Wymap"
											/>
											Back to Wymap
										</Button>
									</li>
									<li>
										<Button
											href="tel:+15182824642"
											className="orange-btn primary-btn"
											color="inherit"
											title="Call Us"
											disableElevation
										>
											<img src={call} alt="Call" />
											1300 WYMAP1
										</Button>
									</li>
								</ul>
							</div>
						)}
					</nav>
				</div>
			</AppBar>
		</div>
	);
}
export default Header;
