import { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Table,
  TableBody,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import DiscussionThread from "@components/discussion-thread-main";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import { routes } from "@utils/constant";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row } = props;
  const handleAccordian = () => {
    setOpen(!open);
    props.handleChange(row);
  };
  useEffect(() => {
    if (props.search !== "") {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.search]);
  useEffect(() => {
    if (props.open === true && props.data[props.index]?._rowChecked) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open, props.data[props.index]?._rowChecked]);
  return (
    <>
      <TableRow onClick={handleAccordian}>
        {row?.isResolved ? (
          <TableCell className="check"></TableCell>
        ) : (
          <TableCell className="check">
            <FormControlLabel
              className="custom-checkbox"
              control={
                <Checkbox
                  key={row.id}
                  icon={<img src={uncheckedIcon} alt="CheckBox" />}
                  checkedIcon={<img src={checkedIconOrange} alt="CheckBox" />}
                  checked={
                    props.data[props.index]?._rowChecked === true && open
                  }
                  name="check"
                />
              }
            />
          </TableCell>
        )}
        <TableCell className="number">-</TableCell>
        <TableCell className="customer">{row.customers?.name || "-"}</TableCell>
        <TableCell className="city">{row.cities?.name || "-"}</TableCell>
        <TableCell className="date">{row.invoiceDate || "-"}</TableCell>
        <TableCell className="gross">{row.gross || "-"}</TableCell>
        <TableCell className="status">
          {row.isResolved ? "Resolved" : "Rejected"}
        </TableCell>
        <TableCell className="chat-column">-</TableCell>
      </TableRow>
      <TableRow className="sub-row">
        <TableCell className="MuiTableSubRoW" colSpan={9}>
          <Collapse in={open}>
            <Table stickyHeader aria-label="simple table">
              <TableBody>
                {row?.childInvoice?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="check"></TableCell>
                      <TableCell className="number">
                        <span
                        onClick={() =>
                          window.open(
                            `${routes.invoiceDetail}/${item.id}`,
                            "_blank"
                          )
                        }
                        className={item.isManual ? "textRedBg" : "textblueBg"}
                      >
                        {item.invoiceNumber || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="customer">
                        {item.customers?.name || "-"}
                      </TableCell>
                      <TableCell className="city">-</TableCell>
                      <TableCell className="date">
                        {item.invoiceDate || "-"}
                      </TableCell>
                      <TableCell className="gross">
                        {" "}
                        {item.gross || "-"}
                      </TableCell>
                      <TableCell className="status">-</TableCell>
                      <TableCell className="chat-column">
                        <DiscussionThread
                          sendMessage={props.sendMessage}
                          rowId={item.id}
                          state={props.state}
                          handleMessage={props.handleMessage}
                          newMessage={props.newMessage}
                          messages={props.messages}
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
                          loading={props.loading}
                          setOpenChat={props.setOpenChat}
                          setSenderId={props.setSenderId}
                        />
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
