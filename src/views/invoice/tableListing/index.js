import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  TableSortLabel,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import { draftInvoiceHeading } from "@utils/constant";
import Row from "./row";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <div className={classes.TableWrapper}>
      <TableContainer component={Paper} className={classes.customTable}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {state?.invoice?.draftInvoiceData?.count !== 0 && (
                <TableCell className="check">
                  <FormControlLabel
                    className="custom-checkbox"
                    control={
                      <Checkbox
                        icon={<img src={uncheckedIcon} alt="CheckBox" />}
                        checkedIcon={
                          <img src={checkedIconOrange} alt="CheckBox" />
                        }
                        onChange={(e) => props.handleMainChange(e)}
                        checked={props._maincheck}
                        name="check"
                      />
                    }
                  />
                </TableCell>
              )}

              {draftInvoiceHeading?.map((item, index) => {
                return (
                  <TableCell className={item.className} key={index}>
                    {item.title}
                    {item.sort && (
                      <TableSortLabel
                        direction={
                          props.orderBy
                            ? props.orderBy === item.sortTitle
                              ? props.order
                              : "desc"
                            : item.sortTitle === "city"
                            ? "asc"
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
          {state?.invoice?.draftInvoiceData?.count === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9}>No Data Found</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {props.data?.map((row, id) => {
                return (
                  <Row
                    key={id}
                    row={row}
                    data={props.data}
                    index={id}
                    handleDateChange={props.handleDateChange}
                    handleChange={props.handleChange}
                    open={props.open}
                    handleUpdate={props.handleUpdate}
                    sendMessage={props.sendMessage}
                    toggleDrawer={(toggle, drawer, id) =>
                      props.toggleDrawer(toggle, drawer, id)
                    }
                    state={props.state}
                    handleMessage={props.handleMessage}
                    newMessage={props.newMessage}
                    messages={state?.invoice?.draftInvoiceChats?.rows}
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
                      // state?.invoice?.loadingDraftInvoiceChats ||
                      state?.invoice?.savingChat ||
                      state?.common?.imageUploading
                    }
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {state?.invoice?.draftInvoiceData?.count !== 0 && (
        <div className="pagination-wrapper">
          <Pagination
            count={state?.invoice?.draftInvoiceData?.count}
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
