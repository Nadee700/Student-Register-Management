import React, { useState } from "react";
import { Button, Form, Table , Modal } from "semantic-ui-react";
import { connect } from 'react-redux'
import { createStudent } from "../redux/student/thunks";
import { selectAddStdFail, selectAddStdLoading, selectAddStdSuccessData } from "../redux/student/selectors";

const StudentForm = ({onPostStudent}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNic] = useState("");
    const [bday, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
          case "fname":
            setFirstname(value);
            break;
          case "lname":
            setLastName(value);
            break;
          case "pno":
            setPhoneNo(value);
            break;
          case "email":
            setEmail(value);
            break;
          case "nic":
            setNic(value);
            break;
          case "bday":
            setDateOfBirth(value);
            break;
          case "address":
            setAddress(value);
            break;
          default:
            break;
        }
    };

    const doSubmit = () => {
        console.log(firstname, lastname, phoneNo, email, nic, bday, address);
        const saveData = {   
              "firstName": firstname,
              "lastName": lastname,
              "phoneNo": phoneNo,
              "email": email,
              "nic":  nic,
              "dateOfBirth": bday,
              "address":  address,
              "avatar": null
            }
        
            onPostStudent(saveData)
     }


    
     
  return (
    <div>
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input
          placeholder="First Name"
          value={firstname}
          onChange={handleChange}
          name="fname"
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          value={lastname}
          onChange={handleChange}
          name="lname"
        />
      </Form.Field>
      <Form.Field>
        <label>Phone No</label>
        <input
          placeholder="First Name"
          value={phoneNo}
          onChange={handleChange}
          name="pno"
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={handleChange}
          name="email"
        />
      </Form.Field>
      <Form.Field>
        <label>NIC</label>
        <input
          placeholder="NIC"
          value={nic}
          onChange={handleChange}
          name="nic"
        />
      </Form.Field>
      <Form.Field>
        <label>Date of Birth</label>
        <input
          placeholder="Date of birth"
          value={bday}
          onChange={handleChange}
          name="bday"
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input
          placeholder="Address"
          value={address}
          onChange={handleChange}
          name="address"
        />
      </Form.Field>

      <Button type="submit" onClick={() => doSubmit()}>Submit</Button>
    </Form>
    </div>
 
  
  );
  }

const mapStateToProps = (state) => ({
  studentSaveData : selectAddStdSuccessData(state),
  studentSaveError : selectAddStdFail(state),
  isLoading : selectAddStdLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  onPostStudent: (std) => dispatch(createStudent(std))
})

export default connect(mapStateToProps,mapDispatchToProps)(StudentForm); 