import React from "react";
import { Link } from "react-router-dom";

import { FooterStyle } from "./style";

function Footer() {
  const classes = FooterStyle();

  return (
    <div className={classes.FooterWrapper}>
      <footer className="site-footer">
        <div className="footer-wrapper">
          <p className="copyright-text">© 2021 Copyright - Wymap Group</p>
          <ul className="cms-link">
            <li>
              <Link to="/" title="Privacy Policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" title="Terms and Conditions">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
