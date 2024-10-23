import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";

interface EntityFormProps {
  data: any; // Dữ liệu thực thể (nhà cung cấp, sản phẩm, thương hiệu...)
  setData: (entity: any) => void;
  fields: Array<{ label: string; name: string; type?: string; options?: any[] }>; // Các trường dữ liệu cần nhập
}

const EntityForm: React.FC<EntityFormProps> = ({ data, setData, fields }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            value={data[field.name] || ""}
            onChange={handleChange}
            select={field.type === "select"}
            required
          >
            {field.type === "select" &&
              field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      ))}
    </Grid>
  );
};

export default EntityForm;
