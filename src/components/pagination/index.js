import { TablePagination } from "@material-ui/core";

import { customPaginationStyle } from "./style";

export default function PaginationView(props) {
  const classes = customPaginationStyle();
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[10, 25, 50, 100, 500]}
      count={props.count ? props.count : 100}
      page={props.page}
      onPageChange={props.handleChangePage}
      rowsPerPage={props.rowsPerPage}
      onRowsPerPageChange={props.handleChangeRowsPerPage}
      classes={{
        root: classes.customPagination,
        menuItem: classes.customPaginationMenuItem,
      }}
    />
  );
}
