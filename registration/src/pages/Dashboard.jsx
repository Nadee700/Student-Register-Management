import React, { useState, useEffect } from "react";
import {
  Segment,
  Grid,
  Icon,
  Button
} from "semantic-ui-react";
import { deleteStudent, loadStudentData, bulkDeleteStudent } from "../redux/student/thunks";
import { useToasts } from "react-toast-notifications";
import {
  selectStdIsLoading,
  selectStdSuccessData,
  selectStdFail,
  selectDeleteStdLoading,
  selectDeleteStdFail,
  selectDeleteStdSuccsee,
} from "../redux/student/selectors";
import { connect } from "react-redux";
import StdudentForm from "./StudentForm";
import MaterialTable from "material-table";

const StudentDashboard = ({
  studentData,
  isLoading,
  initStudents,
  onDeleteStudent,
  onBulkDeleteStudent
}) => {

  const columns = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Phone No", field: "phoneNo" },
    { title: "Email", field: "email" },
    { title: "NIC", field: "nic" },
  ];

  const { addToast } = useToasts();
  const [visible, setVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [tableWidth, setTableWidth] = useState(16);
  const [formType, setFormType] = useState('new');
  
  useEffect(() => {
    loadStudents();
  },[]);

  const loadStudents = async () => {
     await initStudents();
     setVisible(false);
     setTableWidth(16);
  };

  const addNewData = () => {
    toggleIndex();
    setStudentInfo({});
    setFormType("new");
  };

  const handleDelete = async (id) => {
    console.log(id);
    await onDeleteStudent(id);
    loadStudents();
    toggleIndex();
    setStudentInfo({});
    setFormType("new");
    addToast("Deleted Successfully", { appearance: "success" });
  };

  const handleBulkDelete = async () => {
    let rowIds = []
    selectedRows.forEach((row, i) => rowIds.push(row.id));
    console.log(rowIds);
    await onBulkDeleteStudent(rowIds)
    addToast("Deleted Successfully", { appearance: "success" });
    await initStudents();
      // const updatedData = tableData.filter(
      //   (row) => !selectedRows.includes(row)
      // );
      // setTableData(updatedData);
  };

  const checkEmailExists = (email) => {
    const emailCheck = studentData.filter(
      (row) => {
        if (row.email === email) {
          return true;
        } else {
          return false;
        }
      }
    );

    if ((emailCheck.length === 0)) {
      return false
    } else {
      return true;
    };
  }

  const toggleIndex = () => {
    setVisible((prevState) => {
      if (prevState) {
        return false;
      } else {
        return true;
      }
    });
    setTableWidth((prevState) => {
      if (prevState === 10) {
        return 16;
      } else {
        return 10;
      }
    });
  }

  const displayCardData = (data) => {
    if (studentInfo.id === data.id) {
      setVisible((prevState) => {
        if (prevState) {
          return false
        } else {
          return true
        }
      })
      setTableWidth((prevState) => {
        if (prevState === 10) {
          return 16
        } else {
          return 10
        }
      })
    } else {
      setVisible(true);
      setTableWidth(10);
    }

    setFormType('update');
    setStudentInfo(data)
  };

  return (
    <div>
      <Segment basic padded="very">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h2>
                <b>Students' Registration Details</b>
              </h2>
              <Button primary floated="right" onClick={() => addNewData()}>
                <Icon name="add" />
                Add new student
              </Button>
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
        </Grid>
        <Grid columns="equal">
          <Grid.Column width={tableWidth}>
            <Segment basic>
              <MaterialTable
                isLoading={isLoading}
                title="Active Students"
                data={studentData}
                onSelectionChange={(rows) => setSelectedRows(rows)}
                onRowClick={(event, rowData) => displayCardData(rowData)}
                columns={columns}
                options={{
                  selection: true,
                }}
                actions={[
                  {
                    icon: "delete",
                    tooltip: "Delete all selected rows",
                    onClick: () => handleBulkDelete(),
                  },
                ]}
              />
            </Segment>
          </Grid.Column>

          {visible && (
            <Grid.Column>
              <Segment basic>
                <StdudentForm
                  studentRowData={studentInfo}
                  formType={formType}
                  toggleIndex={toggleIndex}
                  handleDelete={handleDelete}
                  checkEmailExists={checkEmailExists}
                />
              </Segment>
            </Grid.Column>
          )}
        </Grid>
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentData: selectStdSuccessData(state),
  studentError: selectStdFail(state),
  isLoading: selectStdIsLoading(state),

  deleteStdLoading: selectDeleteStdLoading(state),
  deleteStdData: selectDeleteStdSuccsee(state),
  deleteStdError: selectDeleteStdFail(state),


});

const mapDispatchToProps = (dispatch) => ({
  initStudents: () => dispatch(loadStudentData()),
  onDeleteStudent: (id) => dispatch(deleteStudent(id)),
  onBulkDeleteStudent: (ids) => dispatch(bulkDeleteStudent(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
