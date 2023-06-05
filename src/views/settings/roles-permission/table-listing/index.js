import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import Pagination from "@components/pagination";
import { getPermissions } from "@utils/commonFunctions";
import { TableStyle } from "./style";
import PermissionPopup from "../permission-popup";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state.rolesPermission?.loadingRoles} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="role-name">Role Name</TableCell>
                <TableCell className="status">Status</TableCell>
                <TableCell className="permission">Permission </TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.rolesPermission?.rolesData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state.rolesPermission?.rolesData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="role-name">{item.name}</TableCell>
                    <TableCell className="status">
                      {item.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="permission">
                      <Button
                        className="orange-btn primary-btn"
                        onClick={() => props.handleClickOpen(item.id)}
                        disabled={!getPermissions().includes("rolePermission")}
                      >
                        Permission
                      </Button>
                    </TableCell>
                    <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell>
                    <TableCell className="delete-link">
                      <span onClick={() => props.handleOpen(item)}>Delete</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {state.rolesPermission?.rolesData?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state.rolesPermission?.rolesData?.count}
              page={props.page}
              handleChangePage={props.handleChangePage}
              rowsPerPage={props.rowsPerPage}
              handleChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </div>
        )}
        <PermissionPopup
          open={props.openPermissionPopup}
          handleClose={props.handleClosePermission}
          permissionData={props.permissionData}
          menuData={props.menuData}
          handleChange={props.permissionChange}
          assignPermission={props.assignPermission}
        />
      </div>
    </>
  );
}
export default TableListing;
