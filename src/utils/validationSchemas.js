import * as yup from "yup";
const phoneRegExp =
	/^([0]\d{1}[\s-]\d{4}[\s-]\d{4}|[0][4]\d{2}[\s-]\d{3}[\s-]\d{3}|[0]\d{1}[\s-]\d{3}[\s-]\d{4}|[0]\d{2}[\s-]\d{4}[\s-]\d{4})$/;

const emailRegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
const longitudeRegExp =
	/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,8}$/;
const latitudeRegExp = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,8}$/;
const validationSchema = {
	loginValidationSchema: yup.object({
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
	}),

	createJobValidationSchema: yup.object({
		customerId: yup.string().required("Please select customer"),
		cityId: yup.string().required("Please select city"),
		jobTypeId: yup.number().required("Please select Job Type"),
		quantity: yup
			.number()
			.max(1000000, "Quantity must not be greater than 1000000")
			.nullable(),
		cargoTypeId: yup
			.string()
			.nullable()
			.when("jobTypeLabel", {
				is: (value) =>
					["Import", "Export", "Empty", "Temp Control"].includes(value),
				then: yup.string().required("Please select cargo type"),
			}),
		dropOffLocation: yup
			.string()
			.max(255, "Dropoff location must not be more than 255 characters")
			.when(["jobTypeLabel", "radioType"], {
				is: (value, val) =>
					value !== "Export" && !["dropOff", ""].includes(val),
				then: yup.string().required("Drop off location is required"),
			}),
		requesterName: yup
			.string()
			.nullable()
			.max(70, "Requester name must not be more than 70 characters"),
		description: yup
			.string()
			.nullable()
			.max(500, "Description must not be more than 500 characters"),
		dropOffLongitude: yup.string().when(["jobTypeLabel", "radioType"], {
			is: (value, val) => value !== "Export" && !["dropOff", ""].includes(val),
			then: yup.string().required("Invalid Address"),
		}),
		ctoId: yup
			.string()
			.nullable()
			.when("jobTypeLabel", {
				is: (value) => ["Import", "Export", "Empty"].includes(value),
				then: yup.string().required("Please select CTO after selecting city"),
			}),
		pickUpLocation: yup
			.string()
			.max(255, "Pickup location must not be more than 255 characters")
			.when(["jobTypeLabel", "radioType"], {
				is: (value, val) => value !== "Import" && !["pickUp", ""].includes(val),
				then: yup.string().required("Pick up location is required"),
			}),
		pickUpLongitude: yup.string().when(["jobTypeLabel", "radioType"], {
			is: (value, val) => value !== "Import" && !["pickUp", ""].includes(val),
			then: yup.string().required("Invalid Address"),
		}),
	}),

	createCompletedJobValidationSchema: yup.object({
		customerId: yup.string().required("Please select customer"),
		cityId: yup.string().required("Please select city"),
		jobTypeId: yup.number().required("Please select Job Type"),
		driverId: yup.number().required("Please select Driver"),
		truckId: yup.number().required("Please select Truck"),
		quantity: yup
			.number()
			.max(1000000, "Quantity must not be greater than 1000000")
			.nullable(),
		cargoTypeId: yup
			.string()
			.nullable()
			.when("jobTypeLabel", {
				is: (value) =>
					["Import", "Export", "Empty", "Temp Control"].includes(value),
				then: yup.string().required("Please select cargo type"),
			}),
		dropOffLocation: yup
			.string()
			.max(255, "Dropoff location must not be more than 255 characters")
			.when(["jobTypeLabel", "radioType"], {
				is: (value, val) =>
					value !== "Export" && !["dropOff", ""].includes(val),
				then: yup.string().required("Drop off location is required"),
			}),
		requesterName: yup
			.string()
			.nullable()
			.max(70, "Requester name must not be more than 70 characters"),
		description: yup
			.string()
			.nullable()
			.max(500, "Description must not be more than 500 characters"),
		dropOffLongitude: yup.string().when(["jobTypeLabel", "radioType"], {
			is: (value, val) => value !== "Export" && !["dropOff", ""].includes(val),
			then: yup.string().required("Invalid Address"),
		}),
		ctoId: yup
			.string()
			.nullable()
			.when("jobTypeLabel", {
				is: (value) => ["Import", "Export", "Empty"].includes(value),
				then: yup.string().required("Please select CTO after selecting city"),
			}),
		pickUpLocation: yup
			.string()
			.max(255, "Pickup location must not be more than 255 characters")
			.when(["jobTypeLabel", "radioType"], {
				is: (value, val) => value !== "Import" && !["pickUp", ""].includes(val),
				then: yup.string().required("Pick up location is required"),
			}),
		pickUpLongitude: yup.string().when(["jobTypeLabel", "radioType"], {
			is: (value, val) => value !== "Import" && !["pickUp", ""].includes(val),
			then: yup.string().required("Invalid Address"),
		}),
		startedAt: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select startedAt date"),
		completedAt: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select completedAt date"),
	}),

	addAirWayBillValidationSchema: yup.object({
		number: yup
			.string()
			.test(
				"len",
				"Must be exactly 8 or 11 characters",
				(val) => val?.length === 9 || val?.length === 12
			)
			.required("AWB number is required"),
		// https://wymap.atlassian.net/browse/MAPTRAK-1051
		flight: yup
			.string()
			.nullable()
			.max(50, "Airline must not be more than 50 characters"),
		weight: yup
			.number()
			.positive("Total weight must be greater than 0")
			.typeError("Total weight must be a number")
			.required("Total weight is required")
			.max(99999, "Total weight  must not be more than 99999"),
		quantity: yup
			.number()
			.positive("Total quantity must be greater than 0")
			.required("Total quantity is required")
			.max(99999, "Total quantity  must not be more than 99999"),
	}),

	addConsignmentValidationSchema: yup.object({
		number: yup
			.string()
			.max(50, "Consignment number must not be more than 50 characters")
			.required("Consignment number is required"),
		weight: yup
			.number()
			.max(99999, "Weight must not be more than 99999")
			.positive("Weight must be greater than 0")
			.typeError("Weight must be a number")
			.required("Weight is required"),
		quantity: yup
			.number()
			.max(99999, "Quantity must not be more than 99999")
			.positive("Quantity must be greater than 0")
			.required("Quantity is required"),
		photo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),
	editConsignmentValidationSchema: yup.object({
		number: yup
			.string()
			.max(50, "Consignment number must not be more than 50 characters")
			.required("Consignment number is required"),
		weight: yup
			.number()
			.max(99999, "Weight must not be more than 99999")
			.positive("Weight must be greater than 0")
			.typeError("Weight must be a number")
			.required("Weight is required"),
		quantity: yup
			.number()
			.max(99999, "Quantity must not be more than 99999")
			.positive("Quantity must be greater than 0")
			.required("Quantity is required"),
		photo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),

	addConsignmentItemValidationSchema: yup.object({
		additionalInfo: yup
			.string()
			.nullable()
			.max(255, "Additional info must not be more than 255 characters"),
		quantity: yup
			.number()
			.max(99999, "Quantity must not be more than 99999")
			.positive("Quantity must be greater than 0")
			.required("Quantity is required"),
		photo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),

	editConsignmentItemValidationSchema: yup.object({
		additionalInfo: yup
			.string()
			.nullable()
			.max(255, "Additional info must not be more than 255 characters"),
		quantity: yup
			.number()
			.max(99999, "Quantity must not be more than 99999")
			.positive("Quantity must be greater than 0")
			.required("Quantity is required"),
		photo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),

	addCustomerValidationSchema: yup.object({
		name: yup
			.string()
			.max(60, "Customer name must not be more than 60 characters")
			.required("Customer name is required"),
		address: yup
			.string()
			.max(255, "Location must not be more than 255 characters")
			.required("Location is required"),
		parentId: yup.string().when("isParent", {
			is: false,
			then: yup.string().required("Please select parent account"),
		}),
		email: yup.lazy((val) =>
			Array.isArray(val)
				? yup
						.array()
						.of(
							yup
								.string()
								.email("Enter a valid email")
								.max(60, "Email address must not be more than 60 characters")
								.matches(emailRegExp, "Enter a valid email")
								.required("Required")
						)
						.required("Email is required")
						.min(1, "Email is required")
				: yup
						.string()
						.email("Enter a valid email")
						.max(60, "Email address must not be more than 60 characters")
						.matches(emailRegExp, "Enter a valid email")
						.required("Email is required")
		),
		phone: yup
			.string()
			.matches(
				phoneRegExp,
				"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
			)
			.required("Phone number is required"),
		oldCustomerNumber: yup
			.string()
			.nullable()
			.max(70, "Old customer number must not be more than 70 characters"),
		status: yup.string().required("Please select status"),
		postalCode: yup
			.string()
			.nullable()
			.max(4, "Postal code must not be more than 4 digits")
			.matches(/\d{4}$/, "Enter a valid postal code"),
		paymentTerms: yup.number().when("parentId", {
			is: (value) => !value,
			then: yup
				.number()
				.required("Payment terms is required")
				.nullable()
				.max(1000, "Payment terms must not be more than 1000")
				.positive("Payment terms must be greater than 0"),
			otherwise: yup.number(),
		}),
		longitude: yup
			.string()
			.nullable()
			.when("parentId", {
				is: (value) => !value,
				then: yup.string().nullable().required("Invalid location"),
			}),
		latitude: yup
			.string()
			.nullable()
			.when("parentId", {
				is: (value) => !value,
				then: yup.string().nullable().required("Invalid location"),
			}),
		invoicingPeriodId: yup.string().required("Please select invoicing period"),
		city: yup.string().required("Please select city"),
		jobTypeId: yup.array().when("parentId", {
			is: (value) => value,
			then: yup
				.array()
				.min(1, "Please select job type")
				.required("Please select job type"),
			otherwise: yup.array(),
		}),
		// https://wymap.atlassian.net/browse/MAPTRAK-926
		ABN: yup
			.string()
			.max(70, "ABN/NZBN must not be more than 70 characters")
			.nullable()
			.required("ABN/NZBN is required"),
		customerCategoryId: yup
			.string()
			.required("Please select customer category"),
		logo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 10 MB or below 10 MB",
				(value) => !value || (value && value.size <= 11534336)
			),
	}),

	resetPasswordValidationSchema: yup.object({
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Confirm Password should be of minimum 8 characters length")
			.required("Confirm Password is required")
			.oneOf([yup.ref("password")], "Confirm Password and Password must match"),
	}),

	forgotPasswordValidationSchema: yup.object({
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
	}),

	addDriverValidationSchema: yup.object({
		name: yup
			.string()
			.max(60, "Driver name must not be more than 60 characters")
			.required("Name is required"),
		employeeNumber: yup
			.string()
			.max(70, "Employee number must not be more than 70 characters")
			.required("Employee number is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Please confirm password")
			.oneOf([yup.ref("password"), null], "New passwords does not match."),
		phone: yup
			.string()
			.matches(
				phoneRegExp,
				"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
			)
			.required("Phone number is required"),
		cityId: yup.string().required("Please select city"),
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		driverTypeId: yup.string().required("Please select driver type"),
		licenseTypeId: yup.string().required("Please select license type"),
		asicTypeId: yup.string().required("Please select ASIC type"),
		active: yup.string().required("Please select status"),
		weekdayWage: yup
			.number()
			.max(1000, "Week day wage must not be more than 1000")
			.positive("Week day wage must be greater than 0")
			.typeError("Week day wage must be number")
			.required("Week day wage is required"),
		saturdayWage: yup
			.number()
			.max(1000, "Saturday wage must not be more than 1000")
			.positive("Saturday wage must be greater than 0")
			.typeError("Saturday wage must be number")
			.required("Saturday wage is required"),
		sundayWage: yup
			.number()
			.max(1000, "Sunday wage must not be more than 1000")
			.positive("Sunday wage must be greater than 0")
			.typeError("Sunday wage must be number")
			.required("Sunday wage is required"),
		publicHoliday1Wage: yup
			.number()
			.max(1000, "Public Holiday 1 Wage must not be more than 1000")
			.positive("Public holiday 1 wage must be greater than 0")
			.typeError("Public holiday 1 wage must be number")
			.required("Public holiday 1 wage is required"),
		publicHoliday2Wage: yup
			.number()
			.max(1000, "Public holiday 2 must not be more than 1000")
			.positive("Public holiday 2 wage must be greater than 0")
			.typeError("Public holiday 2 wage must be number")
			.required("Public holiday 2 wage is required"),
	}),

	editDriverValidationSchema: yup.object().shape(
		{
			name: yup
				.string()
				.max(60, "Driver name must not be more than 60 characters")
				.required("Name is required"),
			employeeNumber: yup
				.string()
				.max(70, "Employee number must not be more than 70 characters")
				.required("Employee number is required"),
			password: yup.string().when("confirmPassword", {
				is: (value) => value,
				then: yup
					.string()
					.min(8, "Password should be of minimum 8 characters length")
					.required("Password is required"),
			}),
			confirmPassword: yup
				.string()
				.when("password", {
					is: (value) => value,
					then: yup
						.string()
						.min(8, "Confirm password should be of minimum 8 characters length")
						.required("Confirm password is required"),
				})
				.oneOf(
					[yup.ref("password"), null],
					"Confirm password must match with password"
				),
			phone: yup
				.string()
				.matches(
					phoneRegExp,
					"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
				)
				.required("Phone number is required"),
			cityId: yup.string().required("Please select city"),
			email: yup
				.string()
				.email("Enter a valid email")
				.max(60, "Email address must not be more than 100 characters")
				.matches(emailRegExp, "Enter a valid email")
				.required("Email is required"),
			driverTypeId: yup.string().required("Please select driver type"),
			licenseTypeId: yup.string().required("Please select license type"),
			asicTypeId: yup.string().required("Please select ASIC type"),
			weekdayWage: yup
				.number()
				.max(1000, "Week day wage must not be more than 1000")
				.positive("Week day wage must be greater than 0")
				.typeError("Week day wage must be number")
				.required("Week day wage is required"),
			saturdayWage: yup
				.number()
				.max(1000, "Saturday wage must not be more than 1000")
				.positive("Saturday wage must be greater than 0")
				.typeError("Saturday wage must be number")
				.required("Saturday wage is required"),
			sundayWage: yup
				.number()
				.max(1000, "Sunday wage must not be more than 1000")
				.positive("Sunday wage must be greater than 0")
				.typeError("Sunday wage must be number")
				.required("Sunday wage is required"),
			publicHoliday1Wage: yup
				.number()
				.max(1000, "Public Holiday 1 Wage must not be more than 1000")
				.positive("Public holiday 1 wage must be greater than 0")
				.typeError("Public holiday 1 wage must be number")
				.required("Public holiday 1 wage is required"),
			publicHoliday2Wage: yup
				.number()
				.max(1000, "Public holiday 2 must not be more than 1000")
				.positive("Public holiday 2 wage must be greater than 0")
				.typeError("Public holiday 2 wage must be number")
				.required("Public holiday 2 wage is required"),
		},
		["password", "confirmPassword"]
	),

	addULDValidationSchema: yup.object().shape({
		volume: yup
			.number()
			.nullable()
			.typeError("Volume must be number")
			.positive("Volume must be greater than 0")
			.max(99999, "Volume must not be more than 99999"),
		// .required("Volume is required"),
		uldNumber: yup
			.string()
			.required("Uld number  is required")
			.matches(
				/^[A-Za-z]{3}[0-9]{4,5}[A-Za-z0-9]{2,3}$/,
				"Enter valid uld number"
			),
		quantity: yup
			.number()
			.positive("Quantity must be greater than 0")
			.max(99999, "Quantity must not be more than 99999")
			.required("Quantity is required"),
	}),

	addLooseValidationSchema: yup.object({
		quantity: yup
			.number()
			.max(99999, "Quantity must not be more than 99999")
			.positive("Quantity must be greater than 0")
			.required("Quantity is required"),
	}),

	assignDriverValidationSchema: yup.object({
		assignDriver: yup.string().required("Please select Driver"),
	}),

	addCustomerUserValidationSchema: yup.object({
		name: yup
			.string()
			.max(60, "Name must not be more than 60 characters")
			.required("Name is required"),
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		phone: yup
			.string()
			.matches(
				phoneRegExp,
				"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
			)
			.required("Phone number is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Please confirm password")
			.oneOf([yup.ref("password"), null], "New passwords does not match."),
	}),

	editCustomerUserValidationSchema: yup.object().shape(
		{
			name: yup
				.string()
				.max(60, "Name must not be more than 60 characters")
				.required("Name is required"),
			email: yup
				.string()
				.email("Enter a valid email")
				.max(60, "Email address must not be more than 100 characters")
				.matches(emailRegExp, "Enter a valid email")
				.required("Email is required"),
			phone: yup
				.string()
				.matches(
					phoneRegExp,
					"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
				)
				.required("Please enter phone number"),
			password: yup.string().when("confirmPassword", {
				is: (value) => value,
				then: yup
					.string()
					.min(8, "Password should be of minimum 8 characters length")
					.required("Password is required"),
			}),
			confirmPassword: yup
				.string()
				.when("password", {
					is: (value) => value,
					then: yup
						.string()
						.min(8, "Confirm password should be of minimum 8 characters length")
						.required("Confirm password is required"),
				})
				.oneOf(
					[yup.ref("password"), null],
					"Confirm password must match with password"
				),
		},
		["password", "confirmPassword"]
	),

	addTrailerValidationSchema: yup.object({
		name: yup
			.string()
			.max(70, "Trailer name must not be more than 70 characters")
			.required("Trailer name is required"),
		rego: yup
			.string()
			.max(70, "Rego number must not be more than 70 characters")
			.required("Rego number is  required"),
		serviceDate: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select service date"),
		registrationDate: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select registration date"),
		fleet: yup
			.string()
			.max(70, "Fleet must not be more than 70 characters")
			.required("Fleet is required"),
		cityId: yup.string().required("Please select city"),
	}),

	addTruckValidationSchema: yup.object({
		truckName: yup
			.string()
			.max(70, "Truck name must not be more than 70 characters")
			.required("Truck name is required"),
		rego: yup
			.string()
			.max(70, "Truck rego must not be more than 70 characters")
			.required("Rego Number is required"),
		vehicleNumber: yup
			.string()
			.max(70, "Truck number must not be more than 70 characters")
			.required("Truck Number is required"),
		typeId: yup.string().required("Please select truck type"),
		serviceDueDate: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select service date"),
		registrationDueDate: yup
			.date()
			.typeError("")
			.nullable()
			.required("Please select registration date"),
		fleet: yup
			.string()
			.max(70, "Fleet must not be more than 70 characters")
			.required("Please enter fleet"),
		cityId: yup.string().required("Please select city"),
	}),

	addHolidaysValidationSchema: yup.object({
		type: yup.string().required("Please select type"),
		city: yup.string().required("Please select city"),
		name: yup
			.string()
			.max(30, "Name must not be more than 30 characters")
			.required("Name is required"),
		date: yup.date().nullable().required("Please select date"),
	}),

	addStaffUserValidationSchema: yup.object({
		name: yup
			.string()
			.max(70, "User name must not be more than 70 characters")
			.required("Name is required"),
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		status: yup.string().required("Please select status"),
		roleId: yup.string().required("Please select role"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Confirm password is required")
			.oneOf(
				[yup.ref("password"), null],
				"Confirm password must match with password"
			),
	}),

	editStaffUserValidationSchema: yup.object().shape(
		{
			name: yup
				.string()
				.max(70, "User name must not be more than 70 characters")
				.required("Name is required"),
			email: yup
				.string()
				.email("Enter a valid email")
				.max(60, "Email address must not be more than 100 characters")
				.matches(emailRegExp, "Enter a valid email")
				.required("Email is required"),
			status: yup.string().required("Please select status"),
			roleId: yup.string().required("Please select role"),
			password: yup.string().when("confirmPassword", {
				is: (value) => value,
				then: yup
					.string()
					.min(8, "Password should be of minimum 8 characters length")
					.required("Password is required"),
			}),
			confirmPassword: yup
				.string()
				.when("password", {
					is: (value) => value,
					then: yup
						.string()
						.min(8, "Confirm password should be of minimum 8 characters length")
						.required("Confirm password is required"),
				})
				.oneOf(
					[yup.ref("password"), null],
					"Confirm password must match with password"
				),
		},
		["password", "confirmPassword"]
	),

	addTollValidationSchema: yup.object({
		latitude: yup
			.number()
			.nullable()
			.min(-90)
			.max(90)
			.required("Latitude is required")
			.typeError("Please enter valid latitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(latitudeRegExp)
			),
		longitude: yup
			.number()
			.nullable()
			.min(-180)
			.max(180)
			.required("Longitude is required")
			.typeError("Please enter valid longitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(longitudeRegExp)
			),
		cost: yup
			.number()
			.nullable()
			.typeError("Cost must be number")
			.max(1000, "Cost must not be more than 1000")
			.positive("cost must be greater than 0")
			.required("Cost is required"),
		address: yup
			.string()
			.max(255, "Address must not be more than 255 characters")
			.required("Address is required"),
	}),
	addCtoValidationSchema: yup.object({
		name: yup
			.string()
			.max(70, "Name length must not be more than 70 characters")
			.required("Name is required"),
		latitude: yup
			.number()
			.nullable()
			.min(-90)
			.max(90)
			.required("Latitude is required")
			.typeError("Please enter valid latitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(latitudeRegExp)
			),
		longitude: yup
			.number()
			.nullable()
			.min(-180)
			.max(180)
			.required("Longitude is required")
			.typeError("Please enter valid longitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(longitudeRegExp)
			),
		location: yup
			.string()
			.max(255, "Location must not be more than 255 characters")
			.required("Location is required"),
		cityId: yup.string().required("Please select city"),
		logo: yup
			.mixed()
			.required("Logo is required")
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),
	editCtoValidationSchema: yup.object({
		name: yup
			.string()
			.max(70, "Name length must not be more than 70 characters")
			.required("Name is required"),
		latitude: yup
			.number()
			.nullable()
			.min(-90)
			.max(90)
			.required("Latitude is required")
			.typeError("Please enter valid latitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(latitudeRegExp)
			),
		longitude: yup
			.number()
			.nullable()
			.min(-180)
			.max(180)
			.required("Longitude is required")
			.typeError("Please enter valid longitude")
			.test("is-decimal", "Please enter decimal value", (value) =>
				(value + "").match(longitudeRegExp)
			),
		location: yup
			.string()
			.max(255, "Location must not be more than 255 characters")
			.required("Location is required"),
		cityId: yup.string().required("Please select city"),
		logo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),

	addRoleValidationSchema: yup.object({
		name: yup
			.string()
			.max(70, "Role length must not be more than 70 characters")
			.required("Role name is required"),
		status: yup.string().required("Please select status"),
	}),

	updateProfileValidationSchema: yup.object().shape(
		{
			name: yup
				.string()
				.max(50, "Name must not be more than 50 characters")
				.required("Name is required"),
			email: yup
				.string()
				.email("Enter a valid email")
				.max(60, "Email address must not be more than 60 characters")
				.matches(emailRegExp, "Enter a valid email")
				.required("Email is required"),
			newPassword: yup
				.string()
				.min(8, "Password should be of minimum 8 characters length")
				.when("currentPassword", {
					is: (value) => value,
					then: yup
						.string()
						.required("New password is required")
						.notOneOf(
							[yup.ref("currentPassword")],
							"New password must not be as current password"
						),
					otherwise: yup.string(),
				}),
			currentPassword: yup
				.string()
				.min(8, "Password should be of minimum 8 characters length")
				.when("newPassword", {
					is: (value) => value,
					then: yup.string().required("Current password is required"),
					otherwise: yup.string(),
				}),
		},
		["newPassword", "currentPassword"]
	),
	addCustomerAddressValidationSchema: yup.object({
		latitude: yup
			.number()
			.nullable()
			.min(-90)
			.max(90)
			.required("Latitude is required")
			.typeError("Please enter valid latitude")
			.test("is-decimal", "Value must be upto 8 decimal points.", (value) =>
				(value + "").match(latitudeRegExp)
			),
		longitude: yup
			.number()
			.nullable()
			.min(-180)
			.max(180)
			.required("Longitude is required")
			.typeError("Please enter valid longitude")
			.test("is-decimal", "Value must be upto 8 decimal points.", (value) =>
				(value + "").match(longitudeRegExp)
			),
		address: yup
			.string()
			.max(255, "Address must not be more than 255 characters")
			.required("Address is required"),
	}),

	minimumContractValidationSchema: yup.object({
		uldValue: yup
			.number()
			.positive("Weight must be greater than 0")
			.required("Weight is required"),
		uldAmount: yup
			.number()
			.positive("Amount must be greater than 0")
			.required("Amount is required"),
		looseValue: yup
			.number()
			.positive("Weight must be greater than 0")
			.required("Weight is required"),
		looseAmount: yup
			.number()
			.positive("Amount must be greater than 0")
			.required("Amount is required"),
	}),
	priceMatrixConsignmentValidationSchema: yup.object({
		weekDaysWage: yup
			.number()
			.typeError("Week day wage must be number")
			.max(1000000, "Weekday wage must not be more than 1000000")
			.required("Weekday wage is required"),
		saturdayWage: yup
			.number()
			.typeError("Saturday wage must be number")
			.max(1000000, "Saturday wage must not be more than 1000000")
			.required("Saturday wage is required"),
		sundayWage: yup
			.number()
			.typeError("Sunday wage must be number")
			.max(1000000, "Sunday wage must not be more than 1000000")
			.required("Sunday wage is required"),
		publicHoliday1Wage: yup
			.number()
			.typeError("Public holiday 1 wage must be number")
			.max(1000000, "Public holiday 1 wage must not be more than 1000000")
			.required("Public holiday 1 wage is required"),
		publicHoliday2Wage: yup
			.number()
			.typeError("Public holiday 2 wage must be number")
			.max(1000000, "Public holiday 2 wage must not be more than 1000000")
			.required("Public holiday 2 wage is required"),
	}),
	addCreditNoteValidationSchema: yup.object({
		childCustomer: yup.string().required("Please select child customer"),
		organisation: yup.string().required("Please select organisation"),
		date: yup.date().nullable().required("Please select date"),
		desc: yup
			.string()
			.max(255, "Description must not be more than 255 characters"),
		amt: yup
			.number()
			.typeError("Amount must be a number")
			.lessThan(1, "Amount should not be greater than 0")
			.required("Amount is required"),
	}),

	addDocumentValidationSchema: yup.object({
		name: yup.string().required("Name is required"),
		// document: yup.string().required("Please upload document"),
	}),

	dailyMinimumHoursRigidValidationSchema: yup.object({
		weekdayHours: yup.number().required("Week day hours is required"),
		weekdayCharge: yup
			.number()
			.typeError("Week day charge must be number")
			.required("Week day charge is required"),
		saturdayHours: yup.number().required("Saturday hours is required"),
		saturdayCharge: yup
			.number()
			.typeError("Saturday charge must be number")
			.required("Saturday charge is required"),
		sundayHours: yup.number().required("Sunday hours is required"),
		sundayCharge: yup
			.number()
			.typeError("Sunday charge must be number")
			.required("Sunday charge is required"),
		publicHoliday1Hours: yup
			.number()
			.required("Public Holiday 1 hours is required"),
		publicHoliday1Charge: yup
			.number()
			.typeError("Public Holiday 1 charge must be number")
			.required("Public Holiday 1 charge is required"),
		publicHoliday2Hours: yup
			.number()
			.required("Public Holiday 2 hours is required"),
		publicHoliday2Charge: yup
			.number()
			.typeError("Public Holiday 2 charge must be number")
			.required("Public Holiday 2 charge is required"),
	}),

	waitingTimeValidationSchema: yup.object({
		freeWaitingTime: yup.number().required("Free waiting time is required"),
		waitingTimeInterval: yup
			.number()
			.required("Waiting time interval is required"),
		weekdayCharge: yup.number().required("Weekday charge is required"),
		saturdayCharge: yup.number().required("Saturday charge is required"),
		sundayCharge: yup.number().required("Sunday charge is required"),
		publicHoliday1Charge: yup
			.number()
			.required("Public Holiday1 charge is required"),
		publicHoliday2Charge: yup
			.number()
			.required("Public Holiday2 charge is required"),
	}),

	priceMatrixLooseValidationSchema: yup.object({
		weekDaysWage: yup
			.number()
			.max(1000, "Week days wage must not be more than 1000")
			.typeError("Week days wage must be number")
			.required("Week days wage is required"),
		saturdayWage: yup
			.number()
			.max(1000, "Saturday wage must not be more than 1000")
			.typeError("Saturday wage must be number")
			.required("Saturday wage is required"),
		sundayWage: yup
			.number()
			.max(1000, "Sunday wage must not be more than 1000")
			.typeError("Sunday wage must be number")
			.required("Sunday wage is required"),
		publicHoliday1Wage: yup
			.number()
			.max(1000, "Public Holiday 1 Wage must not be more than 1000")
			.typeError("Public holiday 1 wage must be number")
			.required("Public holiday 1 wage is required"),
		publicHoliday2Wage: yup
			.number()
			.max(1000, "Public holiday 2 must not be more than 1000")
			.typeError("Public holiday 2 wage must be number")
			.required("Public holiday 2 wage is required"),
	}),

	perJobValidationSchema: yup.object({
		weekdayCharge: yup
			.number()
			.max(1000, "Week days charge must not be more than 1000")
			.typeError("Week days charge must be number")
			.required("Week days charge is required"),
		saturdayCharge: yup
			.number()
			.max(1000, "Saturday charge must not be more than 1000")
			.typeError("Saturday charge must be number")
			.required("Saturday charge is required"),
		sundayCharge: yup
			.number()
			.max(1000, "Sunday charge must not be more than 1000")
			.typeError("Sunday charge must be number")
			.required("Sunday charge is required"),
		publicHoliday1Charge: yup
			.number()
			.max(1000, "Public Holiday 1 charge must not be more than 1000")
			.typeError("Public holiday 1 charge must be number")
			.required("Public holiday 1 charge is required"),
		publicHoliday2Charge: yup
			.number()
			.max(1000, "Public holiday 2 must not be more than 1000")
			.typeError("Public holiday 2 charge must be number")
			.required("Public holiday 2 charge is required"),
	}),

	parentOrganisationValidationSchema: yup.object({
		name: yup
			.string()
			.required("Name is required")
			.nullable()
			.max(70, "Name must not be more than 70 characters"),
	}),

	addChildOrganisationValidatonSchema: yup.object({
		name: yup
			.string()
			.required("Name is required")
			.nullable()
			.max(70, "Name must not be more than 70 characters"),
		parentOrganisationId: yup
			.string()
			.required("Please select parent organisation"),
		cityId: yup.string().required("Please select city"),
		countryId: yup.string().required("Please select country"),
		stateId: yup.string().required("Please select state"),
		address1: yup
			.string()
			.required("Address 1 is required")
			.nullable()
			.max(255, "Address 1 must not be more than 255 characters"),
		address2: yup
			.string()
			.nullable()
			.max(255, "Address 2 must not be more than 255 characters"),
		suburb: yup
			.string()
			.required("Suburb is required")
			.nullable()
			.max(255, "Suburb must not be more than 255 characters"),
		postalCode: yup
			.string()
			.required("Postal code is required")
			.nullable()
			.max(4, "Postal code must not be more than 4 digits")
			.matches(/\d{4}$/, "Enter a valid postal code"),
		ABN: yup
			.string()
			.max(70, "ABN/NZBN must not be more than 70 characters")
			.nullable()
			.required("ABN/NZBN is required"),
		// ABN: yup
		//   .string()
		//   .nullable()
		//   .when("countryId", {
		//     is: (value) => value === "14",
		//     then: yup
		//       .string()
		//       .required("ABN is required")
		//       .test(
		//         "len",
		//         "ABN must be exactly of 11 digits",
		//         (val) => val?.length === 11
		//       ),
		//     otherwise: yup
		//       .string()
		//       .required("NZBN is required")
		//       .test(
		//         "len",
		//         "NZBN must be exactly of 13 digits",
		//         (val) => val?.length === 13
		//       ),
		//   }),
		phone: yup
			.string()
			.matches(
				phoneRegExp,
				"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
			)
			.required("Phone number is required"),
		fax: yup
			.string()
			.max(12, "Fax must not be more than 12 characters")
			// .required("fax is required")
			.nullable(),
		// .matches(
		//   /^(\+?\d{2}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{4})$/,
		//   "Enter a valid fax"
		// ),

		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		BSB: yup.string().nullable(),
		// .test("len", "BSB must be exactly 6 digits", (val) => val?.length === 6),
		// .matches(/\d{3}-\d{3}$/, "Enter a valid BSB number"),
		accountNumber: yup
			.string()
			.required("Account number is required")
			.nullable()
			.max(20, "Account number must not be greater than 20 characters"),
		// .max(10, "Account number must not be more than 10")
		// .min(6, "Account number must not be less than 6"),
		accountName: yup
			.string()
			.required("Account name is required")
			.nullable()
			.max(70, "Account name must not be more than 70 characters"),
		bank: yup
			.string()
			.required("Bank is required")
			.nullable()
			.max(70, "Bank must not be more than 70 characters"),
		photo: yup
			.mixed()
			.required("Photo is required")
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),
	editChildOrganisationValidatonSchema: yup.object({
		name: yup
			.string()
			.required("Name is required")
			.nullable()
			.max(70, "Name must not be more than 70 characters"),
		parentOrganisationId: yup
			.string()
			.required("Please select parent organisation"),
		cityId: yup.string().required("Please select city"),
		countryId: yup.string().required("Please select country"),
		stateId: yup.string().required("Please select state"),
		address1: yup
			.string()
			.required("Address 1 is required")
			.nullable()
			.max(255, "Address 1 must not be more than 255 characters"),
		address2: yup
			.string()
			.nullable()
			.max(255, "Address 2 must not be more than 255 characters"),
		suburb: yup
			.string()
			.required("Suburb is required")
			.nullable()
			.max(255, "Suburb must not be more than 255 characters"),
		postalCode: yup
			.string()
			.required("Postal code is required")
			.nullable()
			.max(4, "Postal code must not be more than 4 digits")
			.matches(/\d{4}$/, "Enter a valid postal code"),
		ABN: yup
			.string()
			.max(70, "ABN/NZBN must not be more than 70 characters")
			.nullable()
			.required("ABN/NZBN is required"),
		phone: yup
			.string()
			.matches(
				phoneRegExp,
				"Enter a valid phone number (0X XXXX XXXX or 04XX XXX XXX or 0X XXX XXXX or 0XX XXXX XXXX)"
			)
			.required("Phone number is required"),
		fax: yup
			.string()
			.max(12, "Fax must not be more than 12 characters")
			// .required("fax is required")
			.nullable(),
		// .matches(
		//   /^(\+?\d{2}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{4})$/,
		//   "Enter a valid fax"
		// ),

		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(emailRegExp, "Enter a valid email")
			.required("Email is required"),
		BSB: yup.string().nullable(),
		// .test("len", "BSB must be exactly 6 digits", (val) => val?.length === 6),
		// .matches(/\d{3}-\d{3}$/, "Enter a valid BSB number"),
		accountNumber: yup
			.string()
			.required("Account number is required")
			.nullable()
			.max(20, "Account number must not be greater than 20 characters"),
		// .max(10, "Account number must not be more than 10")
		// .min(6, "Account number must not be less than 6"),
		accountName: yup
			.string()
			.required("Account name is required")
			.nullable()
			.max(70, "Account name must not be more than 70 characters"),
		bank: yup
			.string()
			.required("Bank is required")
			.nullable()
			.max(70, "Bank must not be more than 70 characters"),
		photo: yup
			.mixed()
			.test(
				"fileSize",
				"File Size is too large, File size must be 5MB or below 5MB",
				(value) => !value || (value && value.size <= 5242880)
			),
	}),

	sftpValidationSchema: yup.object({
		host: yup
			.string()
			.required("Host is required")
			.nullable()
			.max(225, "Host must not be more than 225 characters"),
		port: yup
			.number()
			.required("Port is required")
			.positive("Port must be greater than 0")
			.typeError("Port  must be a number")
			.max(65535, "Port must not be greater than 65535")
			.nullable(),
		userName: yup
			.string()
			.required("Username is required")
			.nullable()
			.max(70, "Username must not be more than 70 characters"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
		readPath: yup
			.string()
			.nullable()
			.when("isReadEnable", {
				is: true,
				then: yup.string().nullable().required("Read path is required"),
			}),
		finishLoadingPath: yup
			.string()
			.nullable()
			.when("isUploadEnable", {
				is: true,
				then: yup
					.string()
					.nullable()
					.required("Finish loading path is required"),
			}),
		finishUnloadingPath: yup
			.string()
			.nullable()
			.when("isUploadEnable", {
				is: true,
				then: yup
					.string()
					.nullable()
					.required("Finish unloading path is required"),
			}),
		runsheetPath: yup.string().when("isUploadEnable", {
			is: true,
			then: yup.string().nullable().required("Run sheet path is required"),
		}),
	}),
};

export default validationSchema;
