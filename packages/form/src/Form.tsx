import React, { ForwardRefExoticComponent, RefAttributes } from "react"
import { Label } from "@jfront/ui-label"
import styled from "styled-components"

const StyledForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.form.padding};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: ${(props) => props.theme.fontFamily};
  overflow: auto;
  height: 100%;
`

StyledForm.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      medium: "12px",
    },
    form: {
      padding: "5px 0 0 10px",
    },
  },
}

const StyledField = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: ${(props) => props.theme.form.field.margin};
  @media (max-width: 575px) {
    flex-direction: column;
  }
`

StyledField.defaultProps = {
  theme: {
    form: {
      field: {
        margin: "0 0 1em 0",
      },
    },
  },
}

const StyledFieldControl = styled.div`
  flex-direction: column;
  box-sizing: border-box;
  display: inline-flex;
  max-width: ${(props) => props.theme.form.field.control.maxWidth};
  flex: 1 1 0;
`

StyledFieldControl.defaultProps = {
  theme: {
    form: {
      field: {
        control: {
          maxWidth: "150px",
        },
      },
    },
  },
}

const StyledFormLabel = styled(Label)<FormLabelProps>`
  min-width: ${(props) => props.theme.form.label.minWidth};
  max-width: ${(props) => props.theme.form.label.maxWidth};
  width: 100%;
  line-height: 1.5715;
  @media (max-width: 575px) {
    text-align: left;
    min-width: unset;
    max-width: unset;
    width: unset;
  }
  ${(props) =>
    props.required
      ? `&::before{
            display: inline-block;
            margin-right: 4px;
            color: #ff4d4f;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: '*';
            vertical-align: top;
          }`
      : ""}
`

StyledFormLabel.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      medium: "12px",
    },
    label: {
      margin: 0,
      color: "#000",
      padding: "0 5px 0 0",
    },
    form: {
      label: {
        maxWidth: "200px",
        minWidth: "150px",
      },
    },
  },
}

const StyledFieldSet = styled.fieldset`
  border: ${(props) =>
    `${props.theme.form.fieldSet.borderWidth} 
    ${props.theme.form.fieldSet.borderStyle} 
    ${props.theme.form.fieldSet.borderColor}`};
  border-radius: ${(props) => props.theme.form.fieldSet.borderRadius};
`

StyledFieldSet.defaultProps = {
  theme: {
    form: {
      fieldSet: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgb(81, 162, 238)",
        borderRadius: "5px",
      },
    },
  },
}

const StyledLegend = styled.legend`
  color: ${(props) => props.theme.form.legend.color};
  margin: ${(props) => props.theme.form.legend.margin};
`

StyledLegend.defaultProps = {
  theme: {
    form: {
      legend: {
        color: "rgb(81, 162, 238)",
        margin: "0 5px",
      },
    },
  },
}

const ErrorSpan = styled.span`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.form.errorColor};
`

ErrorSpan.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      small: "11px",
    },
    form: {
      errorColor: "red",
    },
  },
}

export interface FormFieldSetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string
  renderLegend?: (legend?: string) => React.ReactNode
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  renderLabel?: (label?: string, required?: boolean) => React.ReactNode
}

type Form = ForwardRefExoticComponent<
  React.FormHTMLAttributes<HTMLFormElement> & RefAttributes<HTMLFormElement>
> & {
  Field: React.FC<FormFieldProps>
  Label: React.FC<FormLabelProps>
  Legend: React.FC<React.HTMLAttributes<HTMLLegendElement>>
  Control: React.FC<FormControlProps>
  FieldSet: React.FC<FormFieldSetProps>
}

const InternalForm = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  return (
    <StyledForm {...props} ref={ref}>
      {props.children}
    </StyledForm>
  )
})

const Form: Form = InternalForm as Form

Form.Field = (props: FormFieldProps) => {
  return (
    <StyledField {...props}>
      {props.label && !props.renderLabel && (
        <Form.Label required={props.required}>{props.label}</Form.Label>
      )}
      {props.renderLabel && props.renderLabel(props.label, props.required)}
      {props.children}
    </StyledField>
  )
}

Form.Label = (props: FormLabelProps) => {
  return <StyledFormLabel {...props}>{props.children}</StyledFormLabel>
}

Form.Legend = (props: React.HTMLAttributes<HTMLLegendElement>) => {
  return <StyledLegend {...props}>{props.children}</StyledLegend>
}

Form.FieldSet = (props: FormFieldSetProps) => {
  return (
    <StyledFieldSet {...props}>
      {props.legend && !props.renderLegend && (
        <Form.Legend>{props.legend}</Form.Legend>
      )}
      {props.renderLegend && props.renderLegend(props.legend)}
      {props.children}
    </StyledFieldSet>
  )
}

Form.Control = (props: FormControlProps) => {
  return (
    <StyledFieldControl {...props}>
      {React.Children.only(props.children)}
      {props.error && <ErrorSpan>{props.error}</ErrorSpan>}
    </StyledFieldControl>
  )
}

export { Form }
