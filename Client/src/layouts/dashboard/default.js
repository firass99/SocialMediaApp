//header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//sidebar
import RightSidebar from "../../components/partials/dashboard/SidebarStyle/rightsidebar";

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer

//default
// import DefaultRouter from '../../router/default-router'

// share-offcanvas
// import ShareOffcanvas from '../../components/share-offcanvas'

//settingoffCanvas
import { Outlet } from "react-router-dom";
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

const Default = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <RightSidebar />

      <SettingOffCanvas />
    </>
  );
};

export default Default;
