import React, { useState } from "react";
import { Card, Image, Modal, Button, Icon } from "semantic-ui-react";

export const StudentDetails = ({ studentinfo }) => {
  const [seeMoreVisible, setSeeMoreVisible] = useState(false);

  return (
    <Modal
      open={seeMoreVisible}
      onOpen={() => setSeeMoreVisible(true)}
      trigger={
        <Button
          icon
          color="green"
        >
          <Icon name="eye" />
        </Button>
      }
    >
      <Modal.Header><b>Student Info</b></Modal.Header>
      <Modal.Content>
        <Card fluid>
          <Card.Content>
            <Image floated="left" size="small" src={studentinfo.avatar} />

            <Card.Header>
              {studentinfo.firstName} {studentinfo.lastName}
            </Card.Header>
            <br />
            <Card.Meta>
              <Card.Description>
                <strong>Email :</strong> {studentinfo.email}
                <br />
                <strong>Phone No :</strong>
                {studentinfo.phoneNo}
                <br />
                <strong>NIC :</strong>
                {studentinfo.nic}
                <br />
                <strong>Date of Birth :</strong>
                {studentinfo.dateOfBirth}
                <br />
                <strong>Address :</strong>
                {studentinfo.address}
                <br />
              </Card.Description>
            </Card.Meta>
          </Card.Content>
        </Card>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => setSeeMoreVisible(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
