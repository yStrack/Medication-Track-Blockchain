import React from "react";
import {
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Button
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CheckIcon from "@material-ui/icons/Check";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import api from "../../services/api";

export default function PharmacyDashboard() {
  const [data, setData] = React.useState({
    prescriptionData: [],
    displayedData: [],
    page: 0,
    count: 0,
    rowsPerPage: 10,
    selectedMedicine: ""
  });

  React.useEffect(() => {
    getPharmacyMedicines();
  }, []);

  React.useEffect(() => {
    // console.log("Data updated:", data)
    // console.log("Displayed Data:", data.displayedData)
  }, [data]);

  const getPharmacyMedicines = () => {
    fetch("http://localhost:5000/get_all_presc", {
      method: "GET",
      accept: "application/json"
    }).then(res => {
      //   console.log("res:", res);
      res.json().then(resData => {
        var dataArray = [];
        resData.map((prescription, index) => {
          prescription.Record.medications = JSON.parse(
            prescription.Record.medications
          );
          prescription.Record.medications.map(med => {
            var prescriptionRecCopy = prescription.Record;
            var name = med.name;
            var description = med.description;
            prescriptionRecCopy.name = name;
            prescriptionRecCopy.description = description;
            dataArray.push({
              Key: prescription.Key,
              ...prescriptionRecCopy
            });
          });
        });
        console.log("data:", resData);
        setData({
          ...data,
          prescriptionData: dataArray,
          displayedData: dataArray.slice(0, data.rowsPerPage * (data.page + 1))
        });
      });
    });
  };

  const changePage = page => {
    setData({
      ...data,
      page: page,
      displayedData: data.prescriptionData.slice(
        page * data.rowsPerPage,
        (page + 1) * data.rowsPerPage
      )
    });
  };

  const changeRowsPerPage = rowsPerPage => {
    setData({
      rowsPerPage: rowsPerPage,
      displayedData: data.prescriptionData.slice(
        data.page * rowsPerPage,
        (data.page + 1) * rowsPerPage
      )
    });
  };

  const columns = [
    {
      name: "Key",
      label: "Key",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "name",
      label: "Medication Name",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "description",
      label: "Medication Description",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "patientId",
      label: "Patient CPF",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "doctorId",
      label: "Doctor CRM",
      options: {
        filter: false,
        sort: false
      }
    }
  ];

  const { displayedData, page, count } = data;

  const options = {
    filter: false,
    search: false,
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "stacked",
    serverSide: true,
    resizableColumns: false,
    print: false,
    download: false,
    count: count,
    page: page,
    //selectedRows: selected,
    onTableChange: (action, tableState) => {
      console.log(action, tableState);
      // a developer could react to change on an action basis or
      // examine the state as a whole and do whatever they want
      switch (action) {
        case "changePage":
          changePage(tableState.page);
          break;
        case "changeRowsPerPage":
          changeRowsPerPage(tableState.rowsPerPage);
          break;
        // case 'rowsSelect':
        //   console.log("SELECTED_ROWS:", tableState.selectedRows, selected);
        //   //data.selected = tableState.selectedRows;
      }
    }
  };

  return (
    <div>
      <MUIDataTable
        title={
          <Typography variant="h5">
            Prescriptions
            {/* {isPatientsPrescriptionsLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />} */}
          </Typography>
        }
        data={displayedData}
        columns={columns}
        options={options}
      />
    </div>
  );
}
