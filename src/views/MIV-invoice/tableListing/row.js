import { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Table,
  TableBody,
  Button,
} from "@material-ui/core";

import { routes } from "@utils/constant";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row } = props;
  useEffect(() => {
    if (props.search !== "") {
      setOpen(false);
    }
  }, [props.search]);
  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell className="number">-</TableCell>
        <TableCell className="customer">{row.customers?.name || "-"}</TableCell>
        <TableCell className="city">{row.cities?.name || "-"}</TableCell>
        <TableCell className="date">{row.invoiceDate || "-"}</TableCell>
        <TableCell className="gross-amount">{row.net || "-"}</TableCell>
        <TableCell className="total-amount">
          {row.customers?.minimumInvoiceValue || "-"}
        </TableCell>
        <TableCell className="assign-child">-</TableCell>
      </TableRow>
      <TableRow className="sub-row">
        <TableCell className="MuiTableSubRoW" colSpan={8}>
          <Collapse in={open}>
            <Table stickyHeader aria-label="simple table">
              <TableBody>
                {row?.childInvoice?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        className="number"
                        onClick={() =>
                          window.open(
                            `${routes.invoiceDetail}/${item.id}`,
                            "_blank"
                          )
                        }
                      >
                        {item.invoiceNumber || "-"}
                      </TableCell>
                      <TableCell className="customer">
                        {item.customers?.name || "-"}
                      </TableCell>
                      <TableCell className="city">-</TableCell>
                      <TableCell className="date">
                        {item.invoiceDate || "-"}
                      </TableCell>
                      <TableCell className="gross-amount">
                        {" "}
                        {item.net || "-"}
                      </TableCell>
                      <TableCell className="total-amount">-</TableCell>
                      <TableCell className="assign-child">
                        {" "}
                        <Button
                          className="primary-btn blue-btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                          onClick={() => props.handleAssign(props.index, item)}
                        >
                          Assign
                        </Button>
                        {(item.isMIV === true || item.flag === true) && (
                          <Button
                            className="primary-btn blue-btn done-btn"
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => props.handleDone(item.id)}
                          >
                            Done
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
