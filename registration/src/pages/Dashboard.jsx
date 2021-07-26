import React, { useState, useEffect } from "react";
import MyTable from "../components/MyTable";
import {
  Segment,
  Grid,
  Dimmer,
  Loader,
  Icon,
  Button,
  Modal,
} from "semantic-ui-react";
import { deleteStudent, loadStudentData } from "../redux/student/thunks";
import {
  selectStdIsLoading,
  selectStdSuccessData,
  selectStdFail,
  selectStudentState,
  selectDeleteStdLoading,
  selectDeleteStdFail,
  selectDeleteStdSuccsee,
} from "../redux/student/selectors";
import { connect } from "react-redux";
import StdudentForm from "./StudentForm";
import { StudentDetails } from "./StudentDetails";

const StudentDashboard = ({
  studentData,
  isLoading,
  initStudents,
  all,
  onDeleteStudent,
}) => {
  const columns = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Phone No", field: "phoneNo" },
    { title: "Email", field: "email" },
    { title: "NIC", field: "nic" },
  ];
  const [studentList, setStudentList] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadStudents();
  },[]);

  const loadStudents = async () => {
    await initStudents();
    setStudentList(studentData);
    console.log(all, isLoading, studentData);
  };

  const afterUpdateData = (data) => {
    const students = studentList.filter((item) => item.id !== data.id);
    const updatedStudentsList = [data, ...students];
    setStudentList(updatedStudentsList);
  };

  const afterInsertData = (data) => {
    const updatedStudentsList = [...studentList, data];
    setStudentList(updatedStudentsList);
  };

  const handleDelete = (id) => {
    console.log(id);
    onDeleteStudent(id);
    const students = studentList.filter((item) => item.id !== id);
    console.log(students);
    setStudentList(students);
    setVisible(false);
  };

  return (
    <div>
      <Segment basic padded="very">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h2><b>Students' Registration Details</b></h2>
              <StdudentForm afterInsertData={afterInsertData} />
              <Button
                icon
                color="teal"
                size="tiny"
                onClick={() => loadStudents()}
              >
                <Icon name="refresh" />
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {isLoading === true ? (
                <Dimmer active>
                  <Loader size="big">Loading</Loader>
                </Dimmer>
              ) : (
                <MyTable
                  title="Active Students"
                  columns={columns}
                  data={studentList}
                  options={{
                    filtering: true,
                  }}
                  actions={[
                    {
                      icon: "seeMore",
                      tooltip: "See More",
                      onClick: (event, rowData) => {
                      },
                    },
                    {
                      icon: "edit",
                      tooltip: "Edit User",
                      onClick: (event, rowData) => {
                      },
                    },
                    {
                      icon: "delete",
                      tooltip: "delete User",
                      onClick: (event, rowData) => {
                      },
                    },
                  ]}
                  options={{ actionsColumnIndex: -1 }}
                  components={{
                    Action: (props) => {
                      if (props.action.icon === "seeMore") {
                        return <StudentDetails studentinfo={props.data} />;
                      }
                      if (props.action.icon === "edit") {
                        return (
                          <StdudentForm
                            formType="update"
                            studentRowData={props.data}
                            afterUpdate={afterUpdateData}
                          />
                        );
                      }
                      if (props.action.icon === "delete") {
                        return (
                          <>
                            <Button
                              icon
                              color="red"
                              onClick={() => setVisible(true)}
                            >
                              <Icon name="trash" />
                            </Button>

                            <Modal
                              size="mini"
                              open={visible}
                              onClose={() => setVisible(false)}
                            >
                              <Modal.Header>Delete Record</Modal.Header>
                              <Modal.Content>
                                <p>
                                  Are you sure delete this record ?
                                </p>
                              </Modal.Content>
                              <Modal.Actions>
                                <Button
                                  positive
                                  onClick={() => setVisible(false)}
                                >
                                  No
                                </Button>
                                <Button
                                  negative
                                  onClick={() => handleDelete(props.data.id)}
                                >
                                  Yes
                                </Button>
                              </Modal.Actions>
                            </Modal>
                          </>
                        );
                      }
                    },
                  }}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentData: selectStdSuccessData(state),
  studentError: selectStdFail(state),
  isLoading: selectStdIsLoading(state),
  all: selectStudentState(state),

  deleteStdLoading: selectDeleteStdLoading(state),
  deleteStdData: selectDeleteStdSuccsee(state),
  deleteStdError: selectDeleteStdFail(state),
});

const mapDispatchToProps = (dispatch) => ({
  initStudents: () => dispatch(loadStudentData()),
  onDeleteStudent: (id) => dispatch(deleteStudent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
