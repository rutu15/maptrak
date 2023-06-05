import { useState } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Table,
  TableBody,
} from "@material-ui/core";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row } = props;

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell className="number">
          {row.number ? row.number : "-"}
        </TableCell>
        <TableCell className="pieces">
          {row.quantity ? row.quantity : "-"}
        </TableCell>
        <TableCell className="weight">
          {row.weight ? row.weight : "-"}
        </TableCell>
        <TableCell className="dgClassification">
          {row.dgClassification ? row.dgClassification : "-"}
        </TableCell>
        <TableCell className="unNumber">
          {row.unNumber ? row.unNumber : "-"}
        </TableCell>
        <TableCell className="totalWeight">
          {" "}
          {row.volume ? row.volume : "-"}
        </TableCell>
        <TableCell className="packageWeight">
          {row.indVolume ? row.indVolume : "-"}
        </TableCell>
      </TableRow>
      <TableRow className="sub-row">
        <TableCell className="MuiTableSubRoW" colSpan={7}>
          <Collapse in={open}>
            <Table stickyHeader aria-label="simple table">
              <TableBody>
                {row?.items?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="number">
                        {item.number ? item.number : "-"}
                      </TableCell>
                      <TableCell className="pieces">
                        {item.quantity ? `${item.quantity} Qty` : "-"}
                      </TableCell>
                      <TableCell className="weight">
                        {item.weight ? `${item.weight} Kg` : "-"}
                      </TableCell>
                      <TableCell className="dgClassification" colSpan={4}>
                        {item.additionalInfo ? item.additionalInfo : "-"}
                      </TableCell>
                      <TableCell className="unNumber"></TableCell>
                      <TableCell className="totalWeight"></TableCell>
                      <TableCell className="packageWeight"></TableCell>
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
