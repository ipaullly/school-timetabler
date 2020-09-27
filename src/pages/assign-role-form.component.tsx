import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, useField } from "formik";

import "./assign-role-form.styles.scss";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export const CustomTextField: React.FC<any> = ({
  placeholder,
  label,
  helpTextId,
  id,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        {...field}
        placeholder={placeholder}
        id={id}
        aria-describedby={helpTextId}
        error={!!errorText}
      />
      <FormHelperText id={helpTextId}>{errorText}</FormHelperText>
    </FormControl>
    // <TextField
    //   variant="outlined"
    //   placeholder={placeholder}
    //   {...field}
    //   helperText={errorText}
    //   error={!!errorText}
    //   label={label}
    // />
  );
};

const validationSchema = yup.object({
  email: yup.string().email(),
});

interface IFormProps {
  createAclEntry: (args: any) => any;
}

const AssignRoleForm: React.FC<IFormProps> = ({ createAclEntry }) => {
  const handleAssignRoleSubmit = async (data: any) => {
    const aclEntry = {
      role: data.role,
      scope: {
        type: "user",
        value: data.email,
      },
    };
    return await createAclEntry(aclEntry);
  };

  return (
    <div className="assignRoleContainer">
      <h5>
        Assign Calendar Access
        <hr />
      </h5>
      <Formik
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          role: "",
          email: "",
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          const res = await handleAssignRoleSubmit(data);
          console.log(res, "Formik");

          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <CustomTextField
              placeholder="email"
              name="email"
              type="email"
              label="Assignee Email"
            />
            <div className="roleSelectDropdown">
              <InputLabel shrink={true} htmlFor="role">
                Role
              </InputLabel>
              <Field name="role" type="select" as={Select} label="role">
                <MenuItem value="freeBusyReader">freeBusyReader</MenuItem>
                <MenuItem value="none">none</MenuItem>
                <MenuItem value="reader">reader</MenuItem>
                <MenuItem value="writer">writer</MenuItem>
              </Field>
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AssignRoleForm;
