import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

export const DeleteStudent = ({ data, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button icon color="red" onClick={() => setVisible(true)}>
        <Icon name="trash" />
      </Button>

      <Modal size="mini" open={visible} onClose={() => setVisible(false)}>
        <Modal.Header>Delete Record</Modal.Header>
        <Modal.Content>
          <p>
            Do you want to remove <b>{data.firstName} {data.lastName}</b>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setVisible(false)}>
            No
          </Button>
          <Button negative onClick={() => handleDelete(data.id)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
