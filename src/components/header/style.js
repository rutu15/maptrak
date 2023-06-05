import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const HeaderStyle = makeStyles({
  customMenu: {
    "& .MuiMenu-paper": {
      boxShadow: "0 2px 13px 0 rgb(100 100 100 / 27%)",
      overflow: "inherit",
      top: "90px !important",
      "@media (max-width: 1199px)": {
        top: "80px !important",
      },
      "@media (max-width: 480px)": {
        top: "70px !important",
      },
    },
    "& .MuiList-root": {
      minWidth: 250,
      position: "relative",
      "@media (max-width: 480px)": {
        minWidth: 220,
      },
      "& .MuiMenuItem-root": {
        transition: "all 0.3s",
        padding: "13px 15px 13px 60px",
        "&.logout-link": {
          padding: "0",
          "& a": {
            padding: "13px 15px 13px 60px",
            display: "block",
            textDecoration: "none !important",
          },
          "& img": {
            opacity: "1 !important",
          },
        },
        "& img": {
          position: "absolute",
          left: 25,
          top: 15,
          transition: "all 0.3s",
          "&.active-img , &.hover-img": {
            opacity: "0",
          },
        },
        "&.active,&.active:hover": {
          color: colors.white,
          textDecoration: "none",
          backgroundColor: colors.skyblue,
          "& img": {
            "&.active-img": {
              opacity: "1",
            },
            "&.normal-img": {
              opacity: "0",
            },
          },
        },
        "&:hover": {
          color: colors.red,
          textDecoration: "none",
          backgroundColor: "transparent",
          "& img": {
            "&.hover-img": {
              opacity: "1",
            },
            "&.normal-img": {
              opacity: "0",
            },
          },
        },
      },
    },
  },
  HeaderWrapper: {
    "& .site-header": {
      backgroundColor: colors.primary,
      padding: "0 30px",
      position: "fixed",
      width: "100%",
      top: "0",
      zIndex: 10,
      "@media (max-width: 1199px)": {
        padding: "0 15px",
      },
      "@media (max-width: 991px)": {
        padding: "15px",
      },
      "& .header-wrapper": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .site-logo": {
          display: "block",
          zIndex: "11",
          "& img": {
            width: "135px",
            "@media (max-width: 480px)": {
              width: "100px",
            },
          },
        },
        "& .profile-nav-wrapper": {
          display: "flex",
          alignItems: "center",
          zIndex: "10",
          "& .mob-nav-icon": {
            display: "none",
            "@media (max-width: 991px)": {
              display: "block",
              position: "relative",
              height: "35px",
              width: "35px",
              zIndex: "11",
              cursor: "pointer",
              "& span": {
                position: "absolute",
                backgroundColor: colors.orange,
                width: "23px",
                height: "2px",
                transition: "all 0.3s",
                top: "50%",
                bottom: 0,
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
                fontSize: 0,
                lineHeight: 0,
                marginLeft: "5px",
                ".open-menu &": {
                  backgroundColor: "transparent",
                },
                "&::after, &::before": {
                  marginLeft: "-5px",
                  position: "absolute",
                  content: "' '",
                  width: "28px",
                  backgroundColor: colors.orange,
                  height: "2px",
                  transition: "all 0.3s",
                },
                "&::before": {
                  bottom: "-10px",
                  ".open-menu &": {
                    transform: "rotate(45deg)",
                    bottom: 0,
                  },
                },
                "&::after": {
                  top: "-10px",
                  ".open-menu &": {
                    transform: "rotate(-45deg)",
                    top: 0,
                  },
                },
              },
            },
          },
        },
        "& .main-nav-wrapper": {
          "& .inner-nav-wrapper": {
            display: "flex",
            alignItems: "center",
            "& .main-nav-inner-wrapper": {
              "@media (max-width: 991px)": {
                position: "fixed",
                width: "100%",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: colors.primary,
                paddingTop: "80px",
                zIndex: "8",
                transform: "translateX(-101%)",
                transition: "all 0.3s",
                ".open-menu &": {
                  transform: "translateX(0)",
                },
              },
              "& .main-nav": {
                display: "flex",
                alignItems: "center",
                "@media (max-width: 991px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  maxHeight: "calc(100% - 40px)",
                  overflowY: "auto",
                },
                "& li": {
                  "@media (max-width: 991px)": {
                    width: "100%",
                    "&.active": {
                      "& > a": {
                        color: colors.white,
                        backgroundColor: colors.orange,
                      },
                    },
                  },
                  "@media (min-width: 992px)": {
                    "&.active, &:hover": {
                      "& > a": {
                        color: colors.orange,
                        borderColor: colors.orange,
                      },
                    },
                  },
                },
                "& > li": {
                  "& + li": {
                    marginLeft: 30,
                    "@media (max-width: 1199px)": {
                      marginLeft: 20,
                    },
                    "@media (max-width: 991px)": {
                      marginLeft: 0,
                    },
                  },
                  "& > a": {
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: 400,
                    display: "block",
                    padding: "37px 0",
                    borderBottom: "4px solid transparent",
                    textDecoration: "none !important",
                    "&.active": {
                      color: colors.orange,
                      borderColor: colors.orange,
                    },
                    "@media (max-width: 1199px)": {
                      padding: "30px 0",
                      fontSize: 14,
                    },
                    "@media (max-width: 991px)": {
                      padding: "10px 15px",
                      border: "none",
                      fontSize: 16,
                    },
                  },
                  "&.has-submenu": {
                    position: "relative",
                    marginRight: "15px",
                    "@media (max-width: 991px)": {
                      marginRight: "0",
                      "&.open-submenu": {
                        "& .submenu-arrow": {
                          transform: "translateY(0) rotate(180deg)",
                        },
                        "& .sub-menu": {
                          display: "block",
                        },
                      },
                    },
                    "& .submenu-arrow": {
                      transition: "transform 0.3s",
                      position: "absolute",
                      left: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      "@media (max-width:991px)": {
                        top: "8px",
                        transform: "translateY(0)",
                        left: "auto",
                        right: "20px",
                        zIndex: "-1",
                      },
                    },
                    "&.dashboard-submenu": {
                      "& .sub-menu": {
                        minWidth: "270px",
                      },
                    },
                    "& .sub-menu": {
                      "@media (min-width:992px)": {
                        opacity: "0",
                        transition: "opacity 0.3s",
                        position: "absolute",
                        top: "100%",
                        boxShadow: "0 2px 13px 0 rgb(100 100 100 / 27%)",
                        minWidth: "300px",
                        left: "50%",
                        backgroundColor: colors.white,
                        padding: "10px 15px",
                        borderRadius: "6px",
                        transform: "translateX(-50%)",
                        visibility: "hidden",
                        "& li": {
                          "& a": {
                            color: colors.black,
                            padding: "14px 15px",
                            lineHeight: "1.25",
                            textTransform: "uppercase",
                            display: "block",
                            "@media(max-width:1199px)": {
                              fontSize: "14px",
                            },
                            "&:hover": {
                              color: colors.orange,
                            },
                          },
                          "&.active": {
                            "& a, & a:hover": {
                              backgroundColor: "rgba(247, 146, 57, 0.1)",
                              color: colors.orange,
                            },
                          },
                        },
                      },
                      "@media (max-width:991px)": {
                        padding: "10px 0",
                        display: "none",
                        "& li": {
                          "& a": {
                            color: colors.white,
                            padding: "5px 25px",
                            display: "block",
                            "&.active,&.active:hover": {
                              color: colors.orange,
                            },
                          },
                        },
                      },
                    },
                    "@media (min-width:992px)": {
                      "&:hover": {
                        "& .submenu-arrow": {
                          fill: colors.orange,
                          transform: "translateY(-50%) rotate(180deg)",
                        },
                        "& .sub-menu": {
                          opacity: "1",
                          visibility: "visible",
                          "& li": {
                            "& a": {
                              "&.active,&.active:hover": {
                                color: colors.orange,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "& .profile-menu": {
              marginLeft: 35,
              "@media (max-width: 1199px)": {
                marginLeft: 20,
              },
              "@media (max-width: 991px)": {
                marginLeft: 0,
                marginRight: 20,
              },
              "& .light-blue-btn": {
                fontWeight: 600,
                fontSize: 15,
                display: "inline-flex",
                height: "auto",
                padding: "10px 20px",
                position: "relative",
                "@media (max-width: 1199px)": {
                  padding: "5px 15px",
                },
                "@media (max-width: 480px)": {
                  padding: "2px 15px",
                  fontSize: 0,
                },
                "&::after": {
                  content: "' '",
                  position: "absolute",
                  opacity: "0",
                  visibility: "hidden",
                  top: "calc(100% + 5px)",
                  left: "auto",
                  height: "10px",
                  width: "10px",
                  right: "17px",
                  backgroundColor: colors.white,
                  transform: "rotate(52deg) skewX(15deg)",
                  boxShadow: "0 0px 0px 0 rgb(100 100 100 / 27%)",
                  "@media(max-width:1199px)": {
                    top: "calc(100% + 9px)",
                  },
                  "@media(max-width:479px)": {
                    top: "calc(100% + 7px)",
                  },
                  ".open-profile-menu &": {
                    transition:
                      "opacity 650ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 216ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    opacity: "1",
                    visibility: "visible",
                  },
                },
                "& img": {
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  borderRadius: "50%",
                  overflow: "hidden",
                  "@media (max-width: 1199px)": {
                    width: 30,
                    height: 30,
                  },
                  "@media (max-width: 480px)": {
                    marginRight: 0,
                  },
                },
                "& .MuiSvgIcon-root": {
                  transition: "all 0.3s",
                  ".open-profile-menu &": {
                    transform: "rotate(180deg)",
                  },
                },
              },
            },
          },
          "& .home-nav-wrapper": {
            padding: "30px 0",
            "@media(max-width:991px)": {
              padding: "0",
            },
            "& ul": {
              display: "flex",
              alignItems: "center",
              "& li + li": {
                marginLeft: 30,
                "@media(max-width:767px)": {
                  marginLeft: 15,
                },
              },
              "& li": {
                "& .MuiTypography-colorInherit": {
                  color: colors.white,
                },
                "& button, & a": {
                  "@media(max-width:575px)": {
                    fontSize: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  },
                },
                "& img": {
                  marginRight: "5px",
                  "&.home-icon": {
                    display: "none",
                  },
                  "@media(max-width:575px)": {
                    width: "20px",
                    margin: 0,
                    "&.back-icon": {
                      display: "none",
                    },
                    "&.home-icon": {
                      display: "block",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export { HeaderStyle };
