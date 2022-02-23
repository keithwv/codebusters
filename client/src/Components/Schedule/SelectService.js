import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Controller, useFormContext} from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
 



const SelectService = (props) => {

    const {control, formState} = useFormContext()

    const {duration, formData, servicesProvided, setFormData} = props

    const [selectedService, setSelectedService] = React.useState(null);
     console.log("SelectService")
    
  React.useEffect(() => {
    //Find the array of values associated with the Selected Service in the services prop
    const selectedServiceObject = servicesProvided.find( ({service}) => service==selectedService)
    console.log(selectedServiceObject)
   
    const HourlyCost = selectedServiceObject?.hourly_Cost
    console.log(HourlyCost)
    console.log(duration)
    const totalCost = HourlyCost*duration
    console.log(totalCost)
    setFormData({...formData, hourly_cost: HourlyCost, total_cost:totalCost})
  
    }, [selectedService])
  
   console.log(formData)
    
  return (
    <React.Fragment>
      <form>
        <Grid container direction='row' spacing={3}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom sx={{mt:2 }}>
          Service Selection
            </Typography>
        </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullwidth="true"
              sx={{
                width: 200,
                height: 75,
              }}
            >
              <InputLabel id="title">
                <em>Select a Service</em>
              </InputLabel>
              <Controller
                name="service"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    onChange={(e) => {
                        onChange(e)
                        setSelectedService(e.target.value)
                        setFormData({...formData, service: e.target.value})
                    }}
                    value={servicesProvided.service}
                    id="service"
                    displayEmpty={true}
                    defaultValue=""
                    error={!!formState.errors.service}
                    helperText={formState.errors.service?.message}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {servicesProvided.map((service) => {
                      return (
                        <MenuItem key={service.DOC_ID} value={service.service}>
                          {service.service}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row">
            <Grid item xs={12} sm={6}>
                
            </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SelectService;
