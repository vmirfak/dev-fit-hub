import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../images/logo/b-whitestroke.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-20 md:w-22 lg:w-30 xl:w-25" // Responsive sizing based on breakpoints
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item User Dashboard --> */}

              <li>
                {" "}
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("dashboard") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="##aeb7b1"
                      stroke-width="0.048"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  Página Inicial
                </NavLink>
              </li>
              {/* <!-- Menu Item User Dashboard --> */}
              <li>
                {" "}
                <NavLink
                  to="/admindashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("admindashboard") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="##aeb7b1"
                      stroke-width="0.048"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z"
                        stroke="#aeb7b1"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  Painel Admin
                </NavLink>
              </li>
              {/* <!-- Menu Item User Evaluations2 --> */}
              <li>
                {" "}
                <NavLink
                  to="/evaluations"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("evaluations") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aeb7b1"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                  </svg>
                  Avaliações
                </NavLink>
              </li>
              {/* <!-- Menu Item Plans --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/myexerciseplans" || pathname === "/myfoodplans"
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/myexerciseplans" ||
                            pathname === "/myfoodplans") &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#aeb7b1"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        Os meus Planos
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/myexerciseplans"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Plano de Exercício
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/myfoodplans"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Plano de Nutrição
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Recipes --> */}
              <li>
                <NavLink
                  to="/recipes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("recipes") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    fill="#aeb7b1"
                    width="18"
                    height="18"
                    version="1.1"
                    viewBox="0 0 357.623 357.623"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M357.597,299.635c-0.499-30.43-29.639-47.567-61.3-47.567c-31.928,0.012-54.712,19.218-59.767,35.938 c-12.85,9.178-43.227,3.148-60.73-3.324c-8.377,0.012-136.711,0.012-136.711,0.012l-0.012,0.035 c-0.087-0.012-0.192-0.023-0.291-0.023c-7.848,0-14.215,6.367-14.227,14.21c0,0.407,0.012,1.929,0,2.323 c0.012,7.867,6.378,14.222,14.227,14.222c0.099,0,0.192-0.022,0.291-0.022l-0.012,0.022c0,0,128.375,0,136.734-0.011 c17.526-6.484,47.881-12.549,60.73-3.37c5.066,16.743,27.851,35.937,59.778,35.925c31.649,0,60.789-17.16,61.276-47.578h0.012 c0.012-0.14,0-0.662,0.023-0.779C357.632,299.635,357.608,299.635,357.597,299.635z M320.255,271.843 c-2.242-0.094-5.484-0.209-9.365-0.325c-7.621-0.093-17.985-0.697-27.188,0.731c-2.161,0.256-4.601,1.012-6.809,1.755 c-2.277,0.708-4.543,1.545-6.715,2.44c-4.369,1.695-8.412,3.543-11.921,5.135c-3.463,1.627-6.367,3.056-8.319,4.183 c-1.998,1.046-2.858,2.033-2.766,2.103c-0.104,0.023,0.209-1.429,1.72-3.287c1.487-1.883,3.812-4.299,6.901-6.855 c3.067-2.591,6.879-5.252,11.294-7.762c2.207-1.219,4.531-2.369,7.041-3.45c2.579-1.034,5.101-1.87,8.063-2.429 c5.682-1.068,11.142-0.895,16.149-0.29c5.02,0.558,9.574,1.626,13.361,2.8c3.846,1.139,6.925,2.475,9.017,3.578 c2.149,1.081,3.172,1.953,3.172,1.953S322.509,271.924,320.255,271.843z"></path>{" "}
                          <path d="M56.993,164.283v80.953c0,6.6,5.356,11.944,11.955,11.944h158.078c6.611,0,11.944-5.345,11.944-11.944v-87.104 c14.431-7.233,26.56-17.202,33.81-30.825c14.907-28.042,16.069-55.206,3.301-76.48c-12.758-21.198-37.645-33.357-68.318-33.357 c-21.941,0-41.589,9.62-57.669,21.808c-14.361-15.894-42.083-30.4-71.711-29.627c-19.13,0.5-46.254,7.581-66.912,38.551 C0.834,64.153-2.425,81,1.775,98.3C9.723,130.995,42.998,155.313,56.993,164.283z M31.368,61.463 C43.382,43.437,59.41,34.049,78.993,33.549c21.332-0.5,42.867,10.126,53.19,21.535c-16.295,16.493-26.136,32.445-26.973,33.839 c-3.421,5.629-1.626,12.967,4.014,16.406c5.635,3.428,12.979,1.644,16.417-4.008c0.354-0.593,37.069-59.929,82.098-59.929 c22.076,0,39.504,7.936,47.822,21.75c8.296,13.792,6.902,32.584-3.915,52.917c-19.81,37.267-104.33,38.766-135.235,36.209 c-6.559-0.587-12.362,4.351-12.897,10.921c-0.552,6.588,4.328,12.374,10.91,12.92c1.331,0.104,10.347,0.807,23.545,0.807 c20.118,0,49.955-1.667,77.09-9.591v65.93H80.893V157.55c0-4.345-2.353-8.342-6.146-10.457 c-0.418-0.238-42.344-23.905-49.745-54.503C22.428,81.953,24.513,71.769,31.368,61.463z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  Receitas
                </NavLink>
              </li>
              {/* <!-- Menu Item Shopping List --> */}
              <li>
                <NavLink
                  to="/shoppinglist"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("shoppinglist") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aeb7b1"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="10" cy="20.5" r="1" />
                    <circle cx="18" cy="20.5" r="1" />
                    <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                  </svg>
                  Lista de Compras
                </NavLink>
              </li>
              {/* <!-- Menu Item Clientes --> */}
              <li>
                <NavLink
                  to="/clients"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("clients") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aeb7b1"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Clientes
                </NavLink>
              </li>
              {/* <!-- Menu Item Chat --> */}
              <li>
                <NavLink
                  to="/chat"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("chat") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aeb7b1"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Chat
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
