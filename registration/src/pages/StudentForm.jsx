import React, { useState, useEffect } from "react";
import { Button, Form, Card, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createStudent,
  updateStudent,
  loadStudentData,
} from "../redux/student/thunks";
import {
  selectAddStdFail,
  selectAddStdLoading,
  selectAddStdSuccessData,
  selectUpdateStdFail,
  selectUpdateStdLoading,
  selectUpdateStdSuccess,
} from "../redux/student/selectors";
import FileBase64 from "react-file-base64";
import { validateForm, validateProperty } from "../helpers/validation";
import { StudentSchema } from "../schema/student";
import { useToasts } from "react-toast-notifications";
import { DeleteStudent } from '../components/DeleteModal';
import {
  DateInput,
} from 'semantic-ui-calendar-react';

const StudentForm = ({
  onPostStudent,
  formType = "new",
  studentRowData,
  onUpdateStudent,
  toggleIndex,
  initStudents,
  handleDelete,
  checkEmailExists,
}) => {
  const { addToast } = useToasts();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [bday, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (formType === "update") {
      setFormData();
    }
  }, [studentRowData.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const errorMessage = validateProperty(name, value, StudentSchema);

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    switch (name) {
      case "firstName":
        setFirstname(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      case "nic":
        setNic(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleEmail = (event) => {
    const { name, value } = event.target;
    
    const alreadyexists = checkEmailExists(value);
    const errorMessage = validateProperty(name, value, StudentSchema);
    console.log(alreadyexists);
    if (errorMessage) {
      errors["email"] = errorMessage;
    } else if (alreadyexists) {
      errors["email"] = "email already exists";
      setButtonState(true)
    } else {
      delete errors["email"];
      setButtonState(false);
    }
    setEmail(value);
  }

 const handleDateOfBirth = (event, {name, value}) => {
    setDateOfBirth(value);
  }

  const setFormData = () => {
    setFirstname(studentRowData.firstName);
    setLastName(studentRowData.lastName);
    setEmail(studentRowData.email);
    setPhoneNo(studentRowData.phoneNo);
    setNic(studentRowData.nic);
    setAddress(studentRowData.address);
    setDateOfBirth(studentRowData.dateOfBirth);
    setAvatar(studentRowData.avatar);
  };

  const resetForm = () => {
    setFirstname("");
    setLastName("");
    setEmail("");
    setPhoneNo("");
    setNic("");
    setAddress("");
    setDateOfBirth("");
    setAvatar("");
    setErrors([]);
  };
  const doSubmit = async () => {
    const studentFormData = {
      firstName: firstname,
      lastName: lastname,
      phoneNo: phoneNo,
      email: email,
      nic: nic,
      dateOfBirth: bday,
      address: address,
      avatar: avatar,
    };

    const validateResponse = validateForm(studentFormData, StudentSchema);

    if (!validateResponse) {
      if (formType === "update") {
        const editData = {
          id: studentRowData.id,
          firstName: firstname,
          lastName: lastname,
          phoneNo: phoneNo,
          email: email,
          nic: nic,
          dateOfBirth: bday,
          address: address,
          avatar: avatar,
        };

        await onUpdateStudent(editData);
        addToast("Updated Successfully", { appearance: "success" });
      } else {
        await onPostStudent(studentFormData);
        addToast("Saved Successfully", { appearance: "success" });
      }
      await initStudents();
      toggleIndex();
      resetForm();
    } else {
      setErrors(validateResponse);
    }
  };

  const getFiles = (files) => {
    setAvatar(files[0].base64);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="small" src={avatar} />
        <Card.Header>Student Info Card</Card.Header>
        <br></br>
        <Card.Meta>
          <Form.Group widths="equal">
            <Form.Field>
              <label><b>First Name</b></label>
              <Form.Input
                fluid
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
                name="firstName"
                error={
                  errors["firstName"]
                    ? { content: errors["firstName"], pointing: "below" }
                    : null
                }
              />
            </Form.Field>
            <Form.Field>
              <label><b>Last Name</b></label>
              <Form.Input
                fluid
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
                name="lastName"
                error={
                  errors["lastName"]
                    ? { content: errors["lastName"], pointing: "below" }
                    : null
                }
              />
            </Form.Field>
          </Form.Group>
        </Card.Meta>
        <Card.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Phone No</label>
                <Form.Input
                  placeholder="Phone no"
                  value={phoneNo}
                  onChange={handleChange}
                  name="phoneNo"
                  error={
                    errors["phoneNo"]
                      ? { content: errors["phoneNo"], pointing: "below" }
                      : null
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Form.Input
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  name="email"
                  error={
                    errors["email"]
                      ? { content: errors["email"], pointing: "below" }
                      : null
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>NIC</label>
                <Form.Input
                  placeholder="NIC"
                  value={nic}
                  onChange={handleChange}
                  name="nic"
                  error={
                    errors["nic"]
                      ? { content: errors["nic"], pointing: "below" }
                      : null
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Date of Birth</label>
                {/* <Form.Input
                  
                  placeholder="Date of birth"
                  value={bday}
                  onChange={handleChange}
                  name="dateOfBirth"
                  min="1997-01-01" max="2020-12-31"
                  error={
                    errors["dateOfBirth"]
                      ? { content: errors["dateOfBirth"], pointing: "below" }
                      : null
                  }
                /> */}
                <DateInput
                  name="date"
                  placeholder="Date"
                  value={bday}
                  iconPosition="left"
                  onChange={handleDateOfBirth}
                  dateFormat="YYYY-MM-DD"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <label>Address</label>
                <Form.Input
                  placeholder="Address"
                  value={address}
                  onChange={handleChange}
                  name="address"
                  error={
                    errors["address"]
                      ? { content: errors["address"], pointing: "below" }
                      : null
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Image</label>
                <FileBase64 multiple={true} onDone={getFiles} />
              </Form.Field>
            </Form.Group>
          </Form>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {formType === "update" && (
            <DeleteStudent handleDelete={handleDelete} data={studentRowData} />
          )}
          <Button disabled={buttonState} onClick={() => doSubmit()} primary>
            <Icon name="save" /> {formType === "update" ? "Update" : "Save"}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  studentSaveData: selectAddStdSuccessData(state),
  studentSaveError: selectAddStdFail(state),
  isLoading: selectAddStdLoading(state),
  studentUpdateData: selectUpdateStdSuccess(state),
  studentUpdateError: selectUpdateStdFail(state),
  studentUpdateLoading: selectUpdateStdLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPostStudent: (std) => dispatch(createStudent(std)),
  onUpdateStudent: (std) => dispatch(updateStudent(std)),
  initStudents: () => dispatch(loadStudentData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
