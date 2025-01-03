import { Card, Image } from "react-bootstrap";

//image
import user1 from "../../../../assets/images/user/01.jpg";

const RightSidebar = () => {
  const minirightsidebar = () => {
    document.getElementById("rightSidebar").classList.toggle("right-sidebar");
    document.body.classList.toggle("right-sidebar-close");
  };
  return (
    <>
      <div className="right-sidebar-mini" id="rightSidebar">
        <div className="right-sidebar-panel p-0">
          <Card className="shadow-none">
            <Card.Body className="p-0">
              <div className="media-height p-3" data-scrollbar="init">
                <div className="d-flex align-items-center mb-4">
                  <div className="iq-profile-avatar status-online">
                    <Image
                      className="rounded-circle avatar-50"
                      src={user1}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Nihel Slitii</h6>
                    <p className="mb-0">Just Now</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
