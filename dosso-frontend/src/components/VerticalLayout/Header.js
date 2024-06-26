import PropTypes, { func } from "prop-types"
import React, { useState, useEffect } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
// Redux Store
import {
  changeSidebarType,
  showRightSidebarAction,
  toggleLeftmenu,
} from "store/layout/actions"
let user1 = "../../Assets/images/Dosso21-logo-new.webp";
const Header = props => {
  const [search, setsearch] = useState(false)
  const [pageTitle, setPageTitle] = useState("Default Title")
  const location = useLocation()
  const navigate = useNavigate()

  function tToggle() {
    var body = document.body
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable")
      body.classList.toggle("sidebar-overlay")
    } else {
      body.classList.toggle("vertical")
      body.classList.toggle("sidebar-enable")
      body.classList.toggle("sidebar-overlay")
    }

    var vOverlay = document.getElementById("vOverlay")

    if (window.screen.width <= 998) {
      vOverlay.classList.toggle("d-block")
    } else {
      vOverlay.classList.toggle("d-block")
    }
  }

  // Update the title whenever needed
  useEffect(() => {
    // Example: Set the title when the component mounts
    setPageTitle(document.title)
  }, [location])

  return (
    <React.Fragment>
      <div
        id="vOverlay"
        className="vertical-overlay "
        onClick={() => {
          tToggle()
        }}
      ></div>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-start">
          <div className="ms-2 text-center">
                <img
                  className="img-fluid"
                  src={user1}
                  alt="Header Avatar"
                  width={50}
                />
              </div>
            <div className="fs-5 fw-bold text-uppercase text-white">{pageTitle}</div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
                onClick={() => navigate("/notifications")}
              >
                <i className="mdi mdi-bell-outline"></i>
              </button>
            </div>
            <div className="dropdown d-inline-block d-lg-none">
              <Link to="/myFund">
                <button
                  type="button"
                  className="btn header-item noti-icon "
                  id="page-header-search-dropdown"
                >
                  <i className="bx bx-wallet-alt"></i>
                </button>
              </Link>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
