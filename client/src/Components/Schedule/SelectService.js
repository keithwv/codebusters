import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UserSelectedServiceMode from "./UserSelectedServiceMode";

const SelectService = (props) => {
  const { control, formState } = useFormContext();
  

  const { duration, formData, servicesProvided, setFormData } = props;
  console.log(formData)
  const [selectedService, setSelectedService] = React.useState(formData.service);
  console.log(selectedService)
  // Determine if time slot is a preselected or user-selected service
  let userSelectedService = formData.service === "All";
  console.log(userSelectedService);

  React.useEffect(() => {
    //Find the array of values associated with the Selected Service in the services prop
    const selectedServiceObject = servicesProvided.find(
      ({ service }) => service == selectedService
    );
    console.log("why are you running")
    const HourlyCost = selectedServiceObject?.hourly_Cost;

    const totalCost = HourlyCost * duration;

    setFormData({
      ...formData,
      hourly_cost: HourlyCost,
      total_cost: totalCost,
    });
  }, [selectedService]);

  console.log(formData);

  return (
    <React.Fragment>
      <form>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={6} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Service Selection
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {userSelectedService ? (
              <UserSelectedServiceMode
                formData={formData}
                setFormData={setFormData}
                setSelectedService={setSelectedService}
                servicesProvided={servicesProvided}
              />
            ) : (
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                {formData.service}
            </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SelectService;
