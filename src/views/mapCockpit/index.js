import React, { useEffect, useState } from "react";
import cx from "classnames";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Header from "@components/header";
import Loader from "@components/loader";
import { getFilter, setFilter, removeFilter } from "@utils/commonFunctions";
import { innerPageStyle } from "@utils/commonStyles";
import {
	GET_MAPCOCKPIT,
	GET_MAPCOCKPIT_SUCCESS,
	GET_MAPCOCKPIT_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Filter from "./filter";
import Map from "./map";
import { MapStyle } from "./style";
import { get_vehicle_location } from "./cockpitAPI";
import { get_token } from "./cockpitAPI/getToken";

function MapCockpit(props) {
	const classes = innerPageStyle();
	const filter = getFilter("mapcockpitFilter", true);
	const mapClasses = MapStyle();
	const [filterData, setFilterData] = useState({
		jobType: filter ? filter.jobType : [],
		cargoType: filter ? filter.cargoType : [],
		cto: filter ? filter.cto : [],
		city: filter ? filter.city : [],
	});
	const [updateFilter, setUpdateFilter] = useState({});
	const [openFilter, setOpenFilter] = useState(false);
	const [search, setSearch] = useState(filter ? filter.search : "");
	const [rego, setRego] = useState(true);
	const [state, dispatch] = useStore();

	// API calling to get mapcockpit data
	const getMapcockpit = () => {
		const params = {
			...(!!search ? { search } : {}),
			filter: {
				...(!!filterData.city.length ? { cityId: filterData.city } : {}),
				...(!!filterData.jobType.length
					? { jobTypeId: filterData.jobType }
					: {}),
				...(!!filterData.cargoType.length
					? { cargoTypeId: filterData.cargoType }
					: {}),
				...(!!filterData.cto.length ? { ctoId: filterData.cto } : {}),
			},
		};
		dispatch({ type: GET_MAPCOCKPIT });
		API.get("mapCockpits", { params })
			.then((response) => {
				dispatch({ type: GET_MAPCOCKPIT_SUCCESS, payload: response?.data?.data?.rows });
				getUpdatedLocation(response?.data?.data?.rows);
			})
			.catch((error) => {
				dispatch({
					type: GET_MAPCOCKPIT_FAILURE,
					payload: error?.response?.data,
				});
			});
	};

	const getUpdatedLocation = async (data) => {
		if(!!data.length) {
			try {
				const token = await get_token();
				const newData = await Promise.all(
				data.map(async (item) => {
					if (!!item.trucks.vehicleNumber) {
						try {
							const response = await get_vehicle_location(
							token.data,
							item.trucks.vehicleNumber
							);
							item.jobRunsheets[0].latitude = response?.Latitude;
							item.jobRunsheets[0].longitude = response?.Longitude;
						} catch (error) {
							console.log('error', error);
						}
					}
					return item;
				})
				);
				dispatch({ type: GET_MAPCOCKPIT_SUCCESS, payload: newData });
			} catch (error) {
				console.log('error', error);
			}
		}
	}

	useEffect(() => {
		const interval = setInterval(async () => {
		getUpdatedLocation(state.mapCockpit?.mapcockpitData);
		}, 90000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.mapCockpit?.mapcockpitData, dispatch]);

	useEffect(() => {
		setRego(localStorage.getItem("ShowRego") === "true" ? true : false);

		const interval = setInterval(() => {
			window.location.reload();
		}, 900000);
		return () => {
			removeFilter("mapcockpitFilter");
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		getMapcockpit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateFilter]);

	useEffect(() => {
		setFilterData({
			...filterData,
			cto: openFilter
				? []
				: updateFilter?.cto !== filter?.cto
				? filterData?.cto
				: [],
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterData?.city]);

	useDebouncedEffect(
		() => {
			if (!openFilter) getMapcockpit();
		},
		1000,
		[search]
	);
	const handleSearch = (event) => {
		setSearch(event.target.value.trimStart());
		setFilter(
			"mapcockpitFilter",
			{
				...filterData,
				search: event.target.value.trimStart(),
			},
			true
		);
	};
	const handleFilter = (event) => {
		const { name, value } = event.target;
		setFilterData({
			...filterData,
			[name]: value,
		});
		if (!openFilter) {
			setUpdateFilter(filterData);
			setFilter(
				"mapcockpitFilter",
				{
					...filterData,
					[name]: value,
					search,
				},
				true
			);
		}
	};

	const handleSubmit = (anchor) => {
		setUpdateFilter(filterData);
		setFilter("mapcockpitFilter", { ...filterData, search }, true);
		closeFilerPopup();
	};
	const handleReset = (anchor) => {
		removeFilter("mapcockpitFilter");
		setSearch("");
		setRego(true);
		setFilterData({
			jobType: [],
			cargoType: [],
			cto: [],
			city: [],
		});
		setUpdateFilter({
			jobType: [],
			cargoType: [],
			cto: [],
			city: [],
		});
		closeFilerPopup();
	};
	const openFilterPopup = () => {
		document.body.classList.toggle("open-filter");
		setOpenFilter(true);
	};

	const closeFilerPopup = () => {
		document.body.classList.remove("open-filter");
		setOpenFilter(false);
	};
	const handleRego = (e) => {
		setRego(e.target.checked);
		setFilter("ShowRego", e.target.checked);
		localStorage.setItem("ShowRego", e.target.checked);
	};
	return (
		<>
			<Header />
			<div className={cx(classes.innerPageWrapper, mapClasses.MapWrapper)}>
				<Loader loading={state.mapCockpit?.loadingMapcockpit} />
				<div className="map-page inner-page wrapper">
					<Filter
						handleFilter={handleFilter}
						filterData={filterData}
						openFilterPopup={openFilterPopup}
						closeFilerPopup={closeFilerPopup}
						handleSubmit={handleSubmit}
						handleReset={handleReset}
						handleSearch={handleSearch}
						search={search}
						rego={rego}
						handleRego={handleRego}
					/>
					<Map openFilter={openFilter} rego={rego} />
				</div>
			</div>
		</>
	);
}

export default MapCockpit;
