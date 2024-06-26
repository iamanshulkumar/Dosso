import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
// users
let user1 = "../../Assets/images/Dosso21-logo-new.webp";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical");
      body.classList.toggle("sidebar-enable");
    }
    var vOverlay = document.getElementById("vOverlay")

    if (window.screen.width <= 998) {
      vOverlay.classList.toggle("d-block");
    } else {
      vOverlay.classList.toggle("d-block");
    }
  }

  return (
    <React.Fragment>
      <SimpleBar ref={ref}>
        <div id="sidebar-menu" className="h-100">
          <ul className="metismenu h-100 list-unstyled align-content-between flex-column d-flex" id="side-menu">
            {/* <li className="menu-title">{props.t("Menu")} </li> */}
            <div>
              <div className="mx-3 text-center">
                <img
                  className="img-fluid"
                  src={user1}
                  alt="Header Avatar"
                  width={100}
                />
              </div>
              <li>
                <Link to="/" onClick={() => {
                  tToggle();
                }}>
                  <i className="bx bx-home-circle"></i>
                  <span>{props.t("Home")}</span>
                </Link>
              </li>
              <li>
                <Link to="/myFund" onClick={() => {
                  tToggle();
                }}>
                  <i className='bx bx-wallet-alt' ></i>
                  <span>{props.t("Wallet")}</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => {
                  tToggle();
                }}>
                  <i className="bx bx-user"></i>
                  <span>{props.t("My Profile")}</span>
                </Link>
              </li>
              <li>
                <Link to="/notifications" onClick={() => {
                  tToggle();
                }}>
                  <i className="mdi mdi-bell-outline"></i>
                  <span>{props.t("Notifications")}</span>
                </Link>
              </li>
              
              <li>
                <Link to="/logout">
                  <i className="bx bx-power-off"></i>
                  <span>{props.t("Log Out")}</span>
                </Link>
              </li>
            </div>

            <div className="border-top mt-auto">
              <li>
                <Link to="/ourmission" onClick={() => {
                  tToggle();
                }}>
                  
                  <span>{props.t("Our Mission")}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" onClick={() => {
                  tToggle();
                }}>

                  <span>{props.t("Privacy Policy")}</span>
                </Link>
              </li>
              <li>
                <Link to="/refundpolicy" onClick={() => {
                  tToggle();
                }}>

                  <span>{props.t("Refund Policy")}</span>
                </Link>
              </li>
              <li>
                <Link to="/termsandcondistions" onClick={() => {
                  tToggle();
                }}>

                  <span>{props.t("Terms & Conditions")}</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
