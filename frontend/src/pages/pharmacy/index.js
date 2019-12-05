import React from 'react';
import { Typography, Tooltip, IconButton, TextField, Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

export default function PharmacyDashboard() {
    const [data,setData] = React.useState({
        medicineData: [],
        displayedData:[],
        page:0,
        count:0,
        rowsPerPage:10,
        medicineDialogOpen: false,
        selectedMedicine: "",
    })

    React.useEffect(() => {
        getPharmacyMedicines()
    }, [])

    React.useEffect(() => {
        // console.log("Data updated:", data)
        // console.log("Displayed Data:", data.displayedData)
        
    }, [data])

    const getPharmacyMedicines  = () => {
        fetch("http://localhost:5000/get_all_meds",{
          method:'GET',
          accept:"application/json"
        }).then(res => {
        //   console.log("res:", res);
            res.json().then(resData => {
              resData.map((medicine, index) => {
                var fabDate = new Date(medicine.Record.fabDate * 1000)
                var expDate = new Date(medicine.Record.expDate * 1000)

                medicine.Record.fabDate =  fabDate.getDay() + "/" + fabDate.getMonth() + "/" + fabDate.getFullYear()
                medicine.Record.expDate =  expDate.getDay() + "/" + expDate.getMonth() + "/" + expDate.getFullYear()
                resData[index] = {
                    Key: medicine.Key,
                    ...medicine.Record
                }
            })
            
            console.log("data:",resData)
            setData({...data, medicineData: resData, displayedData:resData.slice(0,data.rowsPerPage*(data.page+1))})
          })
        })
      }

    const changePage = (page) => {
        setData({
            ...data,
            page:page,
            displayedData: data.medicineData.slice(page*data.rowsPerPage,(page+1)*data.rowsPerPage)
        })
    };
    
    const changeRowsPerPage = (rowsPerPage) => {
        setData({
            rowsPerPage: rowsPerPage,
            displayedData:data.medicineData.slice(data.page*rowsPerPage,(data.page+1)*rowsPerPage)

        })
    }

    const handleMedicineDialog = (Key) => {
        setData({...data, medicineDialogOpen: true, selectedMedicine: Key});
    }

    const columns = [
        {
            name:"Key",
            label:"Key",
            options:{
            filter:false,
            sort:false,
            },
        },
        {
            name:"name",
            label:"Medicine Name",
            options:{
            filter:false,
            sort:false,
            },
        },
        {
            name:"fabDate",
            label:"Fabrication Date",
            options:{
            filter:false,
            sort:false,
            }
        },
        {
            name:"expDate",
            label:"Expiration Date",
            options:{
            filter:false,
            sort:false,
            }
        },
        {
            name:"manufacturer",
            label:"Manufacturer",
            options:{
            filter:false,
            sort:false,
            }
        },
        {
            name:"status",
            label:"Medicine Status",
            options:{
                filter:false,
                sort:false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if(value == "stock"){
                    return (
                        <Tooltip title="This medicine is still valid for sale">
                            <IconButton onClick={() => handleMedicineDialog(data.displayedData[tableMeta.rowIndex].Key)}> 
                                <EventNoteIcon />
                            </IconButton>
                        </Tooltip>
                    )
                    }
                    else{
                    return(
                        <Tooltip title="This prescription has already been used!">
                          <CheckIcon />
                        </Tooltip>
                    )
                    }
                }
            },
        },
        
    ]
    
    const { displayedData, page, count } = data;
    
    const options = {
        filter: false,
        search: false,
        selectableRows: 'none',
        filterType: 'dropdown',
        responsive: 'stacked',
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
            case 'changePage':
                changePage(tableState.page);
                break;
            case 'changeRowsPerPage':
                changeRowsPerPage(tableState.rowsPerPage);
                break;
            // case 'rowsSelect':
            //   console.log("SELECTED_ROWS:", tableState.selectedRows, selected);
            //   //data.selected = tableState.selectedRows;
            }
        },
    };

    return (
        <div>
            <MedicineDialog open={data.medicineDialogOpen} onClose={() => setData({...data, medicineDialogOpen:false})} medicine={data.selectedMedicine} />
            <MUIDataTable title={
                <Typography variant="h5">
                    Medicines
                    {/* {isPatientsPrescriptionsLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />} */}
                </Typography>
            } data={displayedData} columns={columns} options={options} />
        </div>
    )
}

function MedicineDialog(props) {
    var { open, onClose } = props;
  
    const [values,setValues] = React.useState({
        medicine: props.medication,
        prescriptionKey: "",
    })
  
    React.useEffect(() => {
        if(values.medicine != props.medicine) {
          setValues({...values, medicine: props.medicine})
        }
    }, [props])

    function handleClose() {
      onClose();
    }
  
    function handleSell() {
        // fetch("http://localhost:5000/sell_meds",{
        //   method:'POST',
        //   accept:"application/json"
        //   body: {
        //     saleId: ;
        //     prescriptionId: ;
        //     medicationId ;
        
        //   }
        // }).then(res => {
        //     //#TODO
            
        // })
        console.log("Medicine Key:", values.medicine)
    }

    return(
      <Dialog onClose={handleClose} aria-labelledby="prescription-dialog" open={open} >
        <DialogTitle id="prescription-dialog-title">Sell Medicine</DialogTitle>
        <DialogContent>
          <DialogContentText style={{paddingTop:20}}>
                To sell the medicine {values.medicine} insert the prescription ID given by the patient
          </DialogContentText>
  
          <TextField 
            style={{width:"100%"}}
            value={values.prescriptionKey}
            onChange = {(event) => setValues({...values, prescriptionKey: event.target.value})}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handleSell} color="primary">
              Sell
            </Button>
          </DialogActions>
  
        </DialogContent>
      </Dialog>
    )
  
}