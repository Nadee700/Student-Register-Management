import React from 'react'
import { useHistory } from "react-router-dom";
import {
    Container,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'

const MasterLayout = props => {
    const history = useHistory();

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container fluid>
            <Menu.Item
              as="a"
              header
              onClick={() => {
                history.push("/");
              }}
            >
              Student Management
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </Menu.Item>

          </Container>
        </Menu>

        <Container style={{ marginTop: "2em" }} fluid>
        <Segment basic>

          {props.children}
        </Segment>
        </Container>

        <Segment
          inverted
          vertical
          style={{ bottom: "0px", position: "fixed", width: "100%" }}
        >
          <Container textAlign="center"></Container>
        </Segment>
      </div>
    );}

export default MasterLayout