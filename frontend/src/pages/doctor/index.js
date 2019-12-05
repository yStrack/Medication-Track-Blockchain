import React from 'react';
import { Card, TextField } from '@material-ui/core';

export default function DoctorDashboard() {
    const [data,setData] = React.useState({
        medications: [{
            name:"",
            quantity:"",
        }],
        patientId: "",
        doctorId: ""
    })

    React.useEffect(() => {
        // getPharmacyMedicines()
    }, [])

    const handleAddMedication = () => {
      console.log("data:",data)
      setData({...data, medications: data.medications.concat({
          name:"",
          quantity:""
        })
      })
    }

    return (
      <Card style={{position:"absolute", width:"80%", top:"2rem", left:"50%"}}>
        <div className="doctor">
          <div className="doctor__information">
              <TextField style={{width:"40%"}} onChange={(event) => setData({...data, patientId:event.target.value})} label="Patient's CPF" />
              <TextField style={{width:"40%", marginLeft:"4rem"}} onChange={(event) => setData({...data, patientId:event.target.value})} label="Doctor's CRM" />            
          </div>
          {
            data.medications.map((item,index) => {
              const handleChange = (type,value) => {
                var temp = data.medications;
                temp[index][type] = value; 
                setData({...value, medications: temp})
              }
              return(
              <div key={index} className="doctor__medications">
                <TextField style={{width:"40%", marginRight: "2rem"}} label="Medication Name" value={data.medications[index].name} onChange={(event) => handleChange("name", event.target.value)} />
                {/* <TextField label="Quantity in mg" type="number" value={data.medications[index].quantity} onChange={(event) => handleChange("quantity", event.target.value)} /> */}
                { index == data.medications.length - 1 ?
                  <a className="doctor__medications__add-button" onClick={() => handleAddMedication()}>&#43;</a>
                  :
                  <div></div>
                }
              </div>
            )})
          }
        </div>
      </Card>
    )
}