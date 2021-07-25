import React, { useState } from "react";
import { Button, Form, Modal, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStudent , updateStudent } from "../redux/student/thunks";
import {
  selectAddStdFail,
  selectAddStdLoading,
  selectAddStdSuccessData,
  selectUpdateStdFail,
  selectUpdateStdLoading,
  selectUpdateStdSuccess,
  selectStdSuccessData
} from "../redux/student/selectors";
import FileBase64 from 'react-file-base64';
import { validateForm, validateProperty } from "../helpers/validation";
import { StudentSchema } from "../schema/student"

const StudentForm = ({ onPostStudent, formType = "new", studentRowData , onUpdateStudent, afterInsertData, afterUpdateData}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [bday, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([])

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
      case "email":
        setEmail(value);
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

  const setFormData = () => {
    setFirstname(studentRowData.firstName)
    setLastName(studentRowData.lastName)
    setEmail(studentRowData.email)
    setPhoneNo(studentRowData.phoneNo)
    setNic(studentRowData.nic)
    setAddress(studentRowData.address)
    setDateOfBirth(studentRowData.dateOfBirth)
    setAvatar(studentRowData.avatar)
  }

  const resetForm = () => {
    setFirstname("")
    setLastName("")
    setEmail("")
    setPhoneNo("")
    setNic("")
    setAddress("")
    setDateOfBirth("")
    setAvatar("")
    setErrors([])
    setOpen(false)

  }
  const doSubmit = () => {

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

    const validateResponse = validateForm(studentFormData, StudentSchema)

    if (!validateResponse) {
      
        if(formType==="update") {

            const editData = {
                id:studentRowData.id,
                firstName: firstname,
                lastName: lastname,
                phoneNo: phoneNo,
                email: email,
                nic: nic,
                dateOfBirth: bday,
                address: address,
                avatar: avatar,
            };
      
            onUpdateStudent(editData)
            afterUpdateData(editData)
          } else {
            onPostStudent(studentFormData);
            afterInsertData(studentFormData)
          }
          setOpen(false)
    } else {
        setErrors(validateResponse)
        setOpen(true)
    }

  };

  const getFiles = (files) => {
    setAvatar(files[0].base64)
  }

  return (
    <div>
      <Modal
        closeIcon
        open={open}
        onClose={resetForm}
        onOpen={() => setOpen(true)}
        trigger={
          formType === "new" ? (
            <Button primary floated="right">
              <Icon name="add" />
              Add new student
            </Button>
          ) : (
            <Button icon color="orange" size="tiny" onClick={() => setFormData()}>
              <Icon name="edit" />
            </Button>
          )
        }
      >
        <Modal.Header>{ formType === "new" ? "Add New" : "Update" } Student Data</Modal.Header>
        <Modal.Content>
          <Form>
              
          <Image src={avatar} size='small' />
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
                name="firstName"
                error={errors["firstName"] ? { content: errors["firstName"] , pointing: 'below' }: null}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
                name="lastName"
                error={errors["lastName"] ? { content: errors["lastName"] , pointing: 'below' }: null}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone No</label>
              <Form.Input
                placeholder="First Name"
                value={phoneNo}
                onChange={handleChange}
                name="phoneNo"
                error={errors["phoneNo"] ? { content: errors["phoneNo"] , pointing: 'below' }: null}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                placeholder="Email"
                value={email}
                onChange={handleChange}
                name="email"
                error={errors["email"] ? { content: errors["email"] , pointing: 'below' }: null}
              />
            </Form.Field>
            <Form.Field>
              <label>NIC</label>
              <Form.Input
                placeholder="NIC"
                value={nic}
                onChange={handleChange}
                name="nic"
                error={errors["nic"] ? { content: errors["nic"] , pointing: 'below' }: null}
              />
            </Form.Field>
            <Form.Field>
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Date of birth"
                value={bday}
                onChange={handleChange}
                name="dateOfBirth"
              />
            </Form.Field>

            <Form.Field>
              <label>Address</label>
              <Form.Input
                placeholder="Address"
                value={address}
                onChange={handleChange}
                name="address"
                error={errors["address"] ? { content: errors["address"] , pointing: 'below' }: null}
              />
            </Form.Field>

            <FileBase64
                multiple={ true }
                onDone={getFiles} 
            />

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => doSubmit()} primary>
            <Icon name="save" /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentSaveData: selectAddStdSuccessData(state),
  studentSaveError: selectAddStdFail(state),
  isLoading: selectAddStdLoading(state),
  studentUpdateData : selectUpdateStdSuccess(state),
  studentUpdateError : selectUpdateStdFail(state),
  studentUpdateLoading : selectUpdateStdLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  onPostStudent: (std) => dispatch(createStudent(std)),
  onUpdateStudent: (std) => dispatch(updateStudent(std)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
