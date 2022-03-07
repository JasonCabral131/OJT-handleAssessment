import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { getBase64, EmailValidator } from "../../../../reusable/common";
import { updateProfileDetails } from "../../../../redux/actions";
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  cursor: "pointer",
}));
const Profile = ({ setModal, modal, userInfo, setUserInfo }) => {
  const profileRef = useRef();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({ file: null, dataUrl: null });
  const { user, token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (userInfo) {
      if (!userInfo.firstname.trim()) {
        Swal.fire({
          icon: "warning",
          text: "FirstName Required",
        });
        return;
      }
      if (!userInfo.lastname.trim()) {
        Swal.fire({
          icon: "warning",
          text: "Lastname Required",
        });
        return;
      }
      if (!EmailValidator(userInfo.email.trim())) {
        Swal.fire({
          icon: "warning",
          text: "Email Required/Invalid",
        });
        return;
      }
      const form = new FormData();
      form.append("lastname", userInfo.lastname);
      form.append("firstname", userInfo.firstname);
      form.append("middlename", userInfo.middlename);
      form.append("email", userInfo.email);
      form.append("_id", userInfo._id);
      if (profile.file) {
        form.append("profile", profile.file);
        form.append("cloudinary_id", userInfo.profile.cloudinary_id);
      }
      Swal.fire({
        title: "Are You Sure?",
        text: `You Wont Revert this action!!!`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const result = await dispatch(
            updateProfileDetails(form, { _id: userInfo._id, token })
          );

          setLoading(false);
          if (result) {
            console.log("asdsd");
            setUserInfo(user);
            setProfile({ file: null, dataUrl: null });
          }
          setModal(false);
        }
      });
      return;
    }
    Swal.fire({
      icon: "warning",
      text: "failed to Update Profile",
    });
    setProfile({ file: null, dataUrl: null });
    setLoading(false);
  };

  const handleChangeProfile = async (e) => {
    try {
      if (e.target.files.length > 0) {
        const dataUrl = await getBase64(e.target.files[0]);
        setProfile({ file: e.target.files[0], dataUrl });
      }
    } catch (e) {}
  };
  useEffect(() => {
    setUserInfo(user);
    // eslint-disable-next-line
  }, [user]);

  return (
    <Modal
      show={modal}
      onHide={() => {
        setModal(false);
      }}
      size="lg"
      dialogClassName="modal-margin-top"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Welcome Admin</Modal.Title>
      </Modal.Header>
      {userInfo ? (
        <Modal.Body>
          <input
            type={"file"}
            style={{ display: "none" }}
            ref={profileRef}
            multiple={false}
            accept="image/*"
            onChange={handleChangeProfile}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: 10,
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt={userInfo.lastname + " " + userInfo.firstname}
                  onClick={() => {
                    profileRef?.current?.click();
                  }}
                >
                  <InsertPhotoIcon />
                </SmallAvatar>
              }
            >
              <Avatar
                alt="Travis Howard"
                src={
                  profile
                    ? profile.dataUrl
                      ? profile.dataUrl
                      : userInfo.profile.url
                    : userInfo.profile.url
                }
                sx={{ width: 150, height: 150 }}
              />
            </Badge>
          </div>
          <div className="row">
            <div className="col-md-4  mt-2">
              <TextField
                className="w-100"
                label="First Name"
                variant="standard"
                value={`${userInfo.firstname}`}
                onChange={(e) => {
                  setUserInfo((prev) => {
                    return { ...prev, firstname: e.target.value };
                  });
                }}
              />
            </div>
            <div className="col-md-4  mt-2">
              <TextField
                className="w-100"
                label="Middlename Name"
                variant="standard"
                value={`${userInfo.middlename}`}
                onChange={(e) => {
                  setUserInfo((prev) => {
                    return { ...prev, middlename: e.target.value };
                  });
                }}
              />
            </div>
            <div className="col-md-4  mt-2">
              <TextField
                className="w-100"
                label="Lastname Name"
                variant="standard"
                value={`${userInfo.lastname}`}
                onChange={(e) => {
                  setUserInfo((prev) => {
                    return { ...prev, lastname: e.target.value };
                  });
                }}
              />
            </div>
            <div className="col-md-12  mt-2">
              <TextField
                className="w-100"
                label="Email Address"
                variant="standard"
                value={`${userInfo.email}`}
                onChange={(e) => {
                  setUserInfo((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </Modal.Body>
      ) : null}

      <Modal.Footer>
        <Button
          onClick={() => setModal(false)}
          disabled={loading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          className="ms-1 loadinCircular"
        >
          {loading ? <>Loading...</> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
