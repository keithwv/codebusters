import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'



const UserSelectedServiceMode = (props) => {

  const {control, formState} = useFormContext()
  const {formData, setFormData, setSelectedService, servicesProvided} = props
  return (
    <FormControl
    fullwidth="true"
    variant="standard"
    sx={{
      width: 200,
      height: 75,
    }}
  >
    <InputLabel id="title">
      Select a Service
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
  )
        }

export default UserSelectedServiceMode