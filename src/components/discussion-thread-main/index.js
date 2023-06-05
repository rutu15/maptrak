import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  SwipeableDrawer,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import cx from "classnames";
import moment from "moment";

import pinImage from "@assets/images/attached-pin.svg";
import closeIcon from "@assets/images/black-close.svg";
import sendIcon from "@assets/images/send.svg";
import chatIcon from "@assets/images/chat-icon.svg";
import SearchIcon from "@assets/images/search-big.svg";
import leftArrow from "@assets/images/left-arrow.svg";
import { getUserId } from "@utils/commonFunctions";
import { DiscussionThreadStyle } from "./style";

function DiscussionThread(props) {
  const classes = DiscussionThreadStyle();
  const fileInputRef = useRef(null);
  const elRef = useRef(null);
  const bottomRef = useRef(null);
  const [data, setdata] = useState([]);
  const [temp, setTemp] = useState([]);
  const [clicked, setClicked] = useState("");
  const [state, setState] = useState({ right: false });

  useEffect(() => {
    if (props.messages?.length !== 0) {
      setTemp(props.messages);
    }
  }, [props.messages]);

  useEffect(() => {
    if (props.openChat === false) {
      setdata([]);
      setTemp([]);
      props.setMessagePage(0);
      props.setSearchMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openChat]);

  useEffect(() => {
    if (temp && props.messages?.length !== 0) {
      let arr = [];
      if (props.messageSent === true) {
        arr = [...temp, ...data];
        props.setMessageSent(!props.messageSent);
      } else if (props.messageSent === false) {
        arr = [...data, ...temp];
      }
      const filtered = arr.filter(
        (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
      );
      setdata(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp]);

  useEffect(() => {
    if ([0].includes(props.messagePage) && props.searchMessage === "") {
      bottomRef?.current?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleScroll = (e) => {
    if (e) {
      if (elRef.current) {
        const { scrollTop } = elRef.current;
        if (scrollTop === 0) {
          if (props.messages?.length !== 0 && props.openChat === true) {
            props.setMessagePage(parseInt(props.messagePage) + 1);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (![0].includes(props.messagePage)) {
      setClicked(props.messages[props.messages?.length - 1]?.id);
    }
    if (props.messages?.length) {
      const el = document.getElementById(clicked);
      if (el) {
        const div = elRef.current;
        div?.scroll({ top: el?.offsetTop + 900, behavior: "smooth" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messagePage, props.messages]);

  useEffect(() => {
    const div = elRef.current;
    if (data) {
      if (div && props.openChat === true) {
        div.addEventListener("scroll", handleScroll, true);
      }
    }
    return () => div?.removeEventListener("scroll", handleScroll, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openChat, data]);

  // for search bar
  const openSearch = (event) => {
    event.target.closest(".search-block").classList.add("open-search");
  };

  const closeSearch = (event) => {
    event.target.closest(".search-block").classList.remove("open-search");
    props.setSearchMessage("");
  };

  const clearInput = () => {
    fileInputRef.current.classList.remove("file-selected");
    props.setImage(null);
  };

  useEffect(() => {
    if (props.image) {
      fileInputRef?.current?.classList?.add("file-selected");
    } else {
      fileInputRef?.current?.classList?.remove("file-selected");
    }
  }, [props.image]);

  const toggleDrawer = (anchor, open, id) => (event) => {
    props.setOpenChat(open);
    props.setSenderId(props.rowId);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.DiscussionThreadWrapper}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="primary-btn blue-btn"
            variant="contained"
            color="primary"
            disableElevation
            onClick={toggleDrawer(anchor, true)}
          >
            <img src={chatIcon} alt="Chat" />
            Chat
          </Button>
          <SwipeableDrawer
            className={classes.DiscussionThreadBox}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="chat-card-wrapper">
              <div className="chat-card">
                <div className="chat-header">
                  <div className="chat-header-block">
                    <div className="title-block">
                      <div
                        className="title-text"
                        onClick={toggleDrawer(anchor, false)}
                      >
                        <img src={leftArrow} alt="leftArrow" />
                        <Typography variant="h2">Chat</Typography>
                      </div>
                    </div>
                    <div className="search-block">
                      <img
                        src={SearchIcon}
                        alt="SearchIcon"
                        onClick={openSearch}
                      />
                      <div className="form-group">
                        <TextField
                          id="search"
                          placeholder="Search Message"
                          variant="outlined"
                          type="search"
                          value={props.searchMessage}
                          onChange={(e) => props.handleSearchedMessage(e)}
                        />
                        <img
                          src={closeIcon}
                          alt="closeIcon"
                          onClick={closeSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-body" ref={elRef}>
                  <div className="chat-body-block">
                    {props.loading ? (
                      <div className="circular-progress">
                        <CircularProgress color="inherit" size={60} />
                      </div>
                    ) : (
                      <ul className="chat-listing">
                        {data?.length > 0
                          ? (!!props.searchMessage
                              ? props.messages
                              : data && [...data]
                            )
                              ?.reverse()
                              ?.map((message, index) => (
                                <li
                                  key={index}
                                  className={cx({
                                    sender:
                                      parseInt(getUserId()) ===
                                      message?.senderId,
                                    receiver:
                                      parseInt(getUserId()) !==
                                      message?.senderId,
                                  })}
                                >
                                  <div className="message-group">
                                    <div
                                      id={message?.id}
                                      key={message?.id}
                                      className="message-box"
                                      onClick={() => setClicked(message.id)}
                                    >
                                      {message?.filePath ? (
                                        message.chatType === "2" ? (
                                          <img
                                            className="attachment"
                                            alt={message?.chat}
                                            src={message.filePath}
                                            onClick={() =>
                                              window.open(message.filePath)
                                            }
                                          />
                                        ) : message.chatType === "3" ? (
                                          <iframe
                                            className="attachment"
                                            allowFullScreen="allowfullscreen"
                                            mozallowfullscreen="mozallowfullscreen"
                                            msallowfullscreen="msallowfullscreen"
                                            oallowfullscreen="oallowfullscreen"
                                            webkitallowfullscreen="webkitallowfullscreen"
                                            src={message.filePath}
                                            height="200"
                                            width="300"
                                            title="Iframe Example"
                                            onClick={() =>
                                              window.open(message.filePath)
                                            }
                                          />
                                        ) : (
                                          <span
                                            className="message-text attached-file attachment"
                                            onClick={() =>
                                              window.open(message.filePath)
                                            }
                                          >
                                            {message?.chat}
                                          </span>
                                        )
                                      ) : (
                                        <span className="message-text ">
                                          {message?.chat}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="date-time">
                                    {moment(message?.createdAt).format(
                                      "DD/MM/YYYY, hh:mm A"
                                    )}
                                  </span>
                                </li>
                              ))
                          : "No Chats Found"}
                        {}
                      </ul>
                    )}

                    <div className="bottomContainerElement" ref={bottomRef} />
                  </div>
                </div>
                {!props.searchMessage && (
                  <div className="chat-footer">
                    <div className="chat-footer-block">
                      <div className="type-message-block">
                        <div className="file-input" ref={fileInputRef}>
                          <TextField
                            variant="outlined"
                            type="file"
                            onChange={props.uploadFile}
                            InputProps={{
                              inputProps: {
                                accept:
                                  "image/x-png,image/jpeg,image/jpg,image/svg+xml,image/gif,image/webp,video/mp4,video/x-msvideo,video/webm,text/csv,application/pdf,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              },
                            }}
                          />
                          <div className="label-block">
                            <img src={pinImage} alt="Upload" />
                            {props.image && (
                              <span className="file-name">
                                <em id="file-name">
                                  {props?.image?.target?.files[0]?.name}
                                </em>
                                <img
                                  src={closeIcon}
                                  alt="Cancel"
                                  onClick={clearInput}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-field-wrapper">
                          <TextField
                            id="message"
                            placeholder="Type a message"
                            variant="outlined"
                            type="text"
                            value={props.newMessage}
                            onChange={props.handleMessage}
                          />
                        </div>
                      </div>
                      <div className="send-btn-block">
                        <Button
                          color="inherit"
                          disableElevation
                          onClick={props.sendMessage}
                          disabled={
                            props.loading === true ||
                            (props.newMessage === "" && props.image === null) ||
                            props.error !== ""
                          }
                        >
                          <img src={sendIcon} alt="Send" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DiscussionThread;
