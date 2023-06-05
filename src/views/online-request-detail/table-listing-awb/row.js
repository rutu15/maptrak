import { useState } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Table,
  TableBody,
} from "@material-ui/core";

import { useStore } from "@store/store";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row } = props;
  const [state] = useStore();

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell className="number">
          {row.number ? row.number : "-"}
        </TableCell>
        <TableCell className="airline">
          {row.flight ? row.flight : "-"}
        </TableCell>
        <TableCell className="readyDate">
          {row.readyDate ? row.readyDate : "-"}
        </TableCell>
        <TableCell className="readyTime">
          {row.readyTime ? row.readyTime : "-"}
        </TableCell>
        <TableCell className="cutTime">
          {row.cutOffTime ? row.cutOffTime : "-"}
        </TableCell>
        <TableCell className="dgClassification">
          {row.dgClassification ? row.dgClassification : "-"}
        </TableCell>
        <TableCell className="unNumber">
          {row.unNumber ? row.unNumber : "-"}
        </TableCell>
        <TableCell className="totalWeight">
          {row.volume ? row.volume : "-"}
        </TableCell>
        <TableCell className="packageWeight">
          {row.indVolume ? row.indVolume : "-"}
        </TableCell>
      </TableRow>
      <TableRow className="sub-row">
        <TableCell className="MuiTableSubRoW" colSpan={9}>
          <Collapse in={open}>
            <Table stickyHeader aria-label="simple table">
              {state.onlineRequest?.getOnlineRequestById?.cargoTypes?.name ===
              "Loose" ? (
                <TableBody>
                  {row?.looses?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="number">
                          {item.number ? item.number : "-"}
                        </TableCell>
                        <TableCell className="airline">
                          {item.quantity ? `${item.quantity} Qty` : "-"}
                        </TableCell>
                        <TableCell className="readyDate">
                          {item.weight ? `${item.weight} Kg` : "-"}
                        </TableCell>
                        <TableCell className="readyTime"></TableCell>
                        <TableCell className="cutTime"></TableCell>
                        <TableCell className="dgClassification"></TableCell>
                        <TableCell className="unNumber"></TableCell>
                        <TableCell className="totalWeight"></TableCell>
                        <TableCell className="packageWeight"></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  {row.ulds.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="number">
                          {item.number ? item.number : "-"}
                        </TableCell>
                        <TableCell className="airline">
                          {item.quantity ? `${item.quantity} Qty` : "-"}
                        </TableCell>
                        <TableCell className="readyDate">
                          {item.weight ? `${item.weight} Kg` : "-"}
                        </TableCell>
                        <TableCell className="readyTime">
                          {item.volume ? `${item.volume} Vol` : "-"}
                        </TableCell>
                        <TableCell className="cutTime"></TableCell>
                        <TableCell className="dgClassification"></TableCell>
                        <TableCell className="unNumber"></TableCell>
                        <TableCell className="totalWeight"></TableCell>
                        <TableCell className="packageWeight"></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
