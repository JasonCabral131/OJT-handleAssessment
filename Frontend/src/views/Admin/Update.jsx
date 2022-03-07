import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { getBase64, EmailValidator } from "./../../reusable/";
import { updateAdminData } from "../../redux/actions";
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  cursor: "pointer",
}));
const initialState = {
  newPass: "",
  confirmPass: "",
};
const UpdateAdminData = ({ setModal, modal, userInfo, setUserInfo }) => {
  const profileRef = useRef();
  const dispatch = useDispatch();
  const [password, setPasssword] = useState(initialState);
  const [profile, setProfile] = useState({ file: null, dataUrl: null });
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
      if (password.newPass.length !== 0) {
        if (password.newPass.length < 8) {
          Swal.fire({
            icon: "warning",
            text: "New Password must be 8 Character Length",
          });
          return;
        }
        if (password.confirmPass !== password.newPass) {
          Swal.fire({
            icon: "warning",
            text: "Confirmation Your Password ",
          });
          return;
        }
        if (password.confirmPass === password.newPass) {
          form.append("password", password.newPass);
        }
      }
      form.append("_id", userInfo._id);
      form.append("firstname", userInfo.firstname);
      form.append("middlename", userInfo.middlename);
      form.append("lastname", userInfo.lastname);
      form.append("email", userInfo.email);
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
          await dispatch(updateAdminData(form));
          setLoading(false);
          setModal(false);
          setUserInfo(null);
          setProfile({ file: null, dataUrl: null });
        }
      });
    }
  };

  const handleChangeProfile = async (e) => {
    try {
      if (e.target.files.length > 0) {
        const dataUrl = await getBase64(e.target.files[0]);
        setProfile({ file: e.target.files[0], dataUrl });
      }
    } catch (e) {}
  };

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
                  alt={Math.random()}
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
                  profile.dataUrl
                    ? profile.dataUrl
                    : userInfo.profile.url
                    ? userInfo.profile.url
                    : "https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU="
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
            <div className="col-md-6  mt-2">
              <TextField
                className="w-100"
                label="New Password"
                variant="standard"
                value={`${password.newPass}`}
                onChange={(e) => {
                  setPasssword((prev) => {
                    return { ...prev, newPass: e.target.value };
                  });
                }}
              />
            </div>
            <div className="col-md-6  mt-2">
              <TextField
                className="w-100"
                label="Confirm Password"
                variant="standard"
                value={`${password.confirmPass}`}
                onChange={(e) => {
                  setPasssword((prev) => {
                    return { ...prev, confirmPass: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </Modal.Body>
      ) : null}

      <Modal.Footer>
        <Button
          onClick={() => {
            setModal(false);
            setUserInfo(null);
            setPasssword(initialState);
          }}
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

export default UpdateAdminData;
