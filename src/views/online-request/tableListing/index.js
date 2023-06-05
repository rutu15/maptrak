import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import Loader from "@components/loader";
import DiscussionThread from "@components/discussion-thread-main";
import {
  ACKNOWLEDGE_REQUEST,
  ACKNOWLEDGE_REQUEST_SUCCESS,
  ACKNOWLEDGE_REQUEST_FAILURE,
  ASSIGN_DRIVER,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import { requestHeading, routes } from "@utils/constant";
import {
  requestStatusColors,
  dashboardRequestStatusColors,
} from "@utils/commonFunctions";
import AssignDriverPopup from "../assignDriverPopup";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();
  const [openDriverPopup, setOpenDriverPopup] = useState(false);
  const [state, dispatch] = useStore();
  const [driverId, setDriverId] = useState("");
  const [jobId, setJobId] = useState("");
  const [cityId, setCityId] = useState("");
  const [error, setError] = useState("");

  // API calling to acknowledge online request by admin
  const handleClick = (id) => {
    dispatch({ type: ACKNOWLEDGE_REQUEST });
    API.put(`onlineRequests/${id}/acknowledged`)
      .then((response) => {
        dispatch({
          type: ACKNOWLEDGE_REQUEST_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Acknowledged Successfully");
        props.getOnlineRequest();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        dispatch({ type: ACKNOWLEDGE_REQUEST_FAILURE, payload: error });
      });
  };

  const handleChange = (e) => {
    setDriverId(e.target.value);
  };

  // Open driver popup
  const handleDriverPoppupOpen = (id, cityId) => {
    setOpenDriverPopup(true);
    setJobId(id);
    setCityId(cityId);
  };

  // Close driver popup
  const handleDriverPopupClose = (id) => {
    setOpenDriverPopup(false);
    setError("");
    setDriverId("");
  };

  // API calling to assign driver to not assigned jobs
  const handleAssign = () => {
    dispatch({ type: ASSIGN_DRIVER });
    API.put(`jobs/${jobId}/assignDriver`, { driverId })
      .then((response) => {
        dispatch({
          type: ASSIGN_DRIVER_SUCCESS,
          payload: response?.data?.data,
        });
        handleDriverPopupClose();
        toast.success("Driver Assigned Successfully");
        props.getOnlineRequest();
      })
      .catch((error) => {
        dispatch({ type: ASSIGN_DRIVER_FAILURE, payload: error });
        setError(error.response?.data?.message);
      });
  };

  return (
    <div className={classes.TableWrapper}>
      <Loader
        loading={
          state?.onlineRequest?.loadingOnlineRequest ||
          state?.onlineRequest?.acknowledgingRequest
        }
      />
      <TableContainer component={Paper} className={classes.customTable}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {requestHeading.map((item, index) => {
                return (
                  <TableCell key={index} className={item.className}>
                    {item.title}
                    {item.sort && (
                      <TableSortLabel
                        direction={
                          props.orderBy === item.sortTitle
                            ? props.order
                            : "desc"
                        }
                        active={true}
                        onClick={(e) => props.handleSorting(e, item)}
                      ></TableSortLabel>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.onlineRequest?.onlineRequestData?.count === 0 ? (
              <TableRow className="no-data">
                <TableCell colSpan={7}>
                  <span>No Data Found</span>
                </TableCell>
              </TableRow>
            ) : (
              state.onlineRequest?.onlineRequestData?.rows?.map(
                (item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="chat">
                        <DiscussionThread
                          sendMessage={props.sendMessage}
                          rowId={item.id}
                          state={props.state}
                          handleMessage={props.handleMessage}
                          newMessage={props.newMessage}
                          messages={
                            state?.onlineRequest?.onlineRequestChats?.rows
                          }
                          messagePage={props.messagePage}
                          setMessagePage={props.setMessagePage}
                          handleSearchedMessage={props.handleSearchedMessage}
                          searchMessage={props.searchMessage}
                          setSearchMessage={props.setSearchMessage}
                          messageSent={props.messageSent}
                          setMessageSent={props.setMessageSent}
                          openChat={props.openChat}
                          uploadFile={props.uploadFile}
                          image={props.image}
                          setImage={props.setImage}
                          chatType={props.chatType}
                          error={props.error}
                          setOpenChat={props.setOpenChat}
                          setSenderId={props.setSenderId}
                          loading={
                            state?.onlineRequest?.savingChat ||
                            state?.common?.imageUploading
                          }
                        />
                      </TableCell>
                      {/* https://wymap.atlassian.net/browse/MAPTRAK-944 Displayed ID */}
                      <TableCell className="id">
                        <Link
                          to={{
                            pathname: `${routes.onlineRequestDetail}/${item.id}`,
                            state: item,
                          }}
                        >
                          {item.id}
                        </Link>
                      </TableCell>
                      <TableCell className="referenceNo">
                        {item.referenceNo}
                      </TableCell>
                      <TableCell className="customerName">
                        {item.customers ? item.customers.name : "-"}
                      </TableCell>
                      <TableCell className="jobType">
                        {item.jobTypes ? item.jobTypes.name : "-"}
                      </TableCell>
                      <TableCell className="cargoType">
                        {item.cargoTypes ? item.cargoTypes.name : "-"}
                      </TableCell>
                      <TableCell>{item.ctos ? item.ctos.name : "-"}</TableCell>
                      <TableCell
                        className={`request-status ${requestStatusColors(
                          item.onlineRequestStatuses?.name
                        )}`}
                      >
                        <span>
                          {item.onlineRequestStatuses
                            ? item.onlineRequestStatuses.name
                            : "-"}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`jobStatus ${dashboardRequestStatusColors(
                          item.jobStatuses?.name
                        )} `}
                      >
                        <span>
                          {item.jobStatuses ? item.jobStatuses.name : "-"}
                        </span>
                      </TableCell>
                      <TableCell className="city">
                        {item.cities ? item.cities.name : "-"}
                      </TableCell>
                      <TableCell className="action assign-driver">
                        {item.onlineRequestStatuses?.name === "Created" ? (
                          <Button
                            className="primary-btn orange-btn "
                            color="primary"
                            disableElevation
                            onClick={() => handleClick(item.id)}
                          >
                            Acknowledge
                          </Button>
                        ) : item.onlineRequestStatuses?.name ===
                          "Acknowledged" ? (
                          <Button
                            color="primary"
                            className="primary-btn"
                            onClick={() =>
                              handleDriverPoppupOpen(item.id, item?.cities?.id)
                            }
                          >
                            Assign driver
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            )}
          </TableBody>
        </Table>
        <AssignDriverPopup
          handleClose={handleDriverPopupClose}
          open={openDriverPopup}
          driverId={driverId}
          handleChange={handleChange}
          handleAssign={handleAssign}
          error={error}
          cityId={cityId}
        />
      </TableContainer>
      {state.onlineRequest?.onlineRequestData?.count !== 0 && (
        <div className="pagination-wrapper">
          <Pagination
            count={state.onlineRequest?.onlineRequestData?.count}
            page={props.page}
            handleChangePage={props.handleChangePage}
            rowsPerPage={props.rowsPerPage}
            handleChangeRowsPerPage={props.handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
}
export default TableListing;
