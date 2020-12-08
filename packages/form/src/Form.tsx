import React, { ForwardRefExoticComponent, RefAttributes } from "react"
import { Label, LabelProps } from "@jfront/ui-label"
import styled from "styled-components"

const StyledForm = styled.form`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 5px;
  font-family: Arial, sans-serif;
  font-size: small;
  overflow: auto;
`

const StyledField = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 1em;
  @media (max-width: 575px) {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
`

const StyledFieldControl = styled.div`
  flex-direction: column;
  box-sizing: border-box;
  display: inline-flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 0;
  flex: 1 1 0;
`

export interface FormFieldSetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string
  renderLegend?: (legend?: string) => React.ReactNode
}

export interface FormLabelProps extends LabelProps {
  required?: boolean
}

const StyledFormLabel = styled(Label)<FormLabelProps>`
  min-width: 150px;
  max-width: 200px;
  width: 100%;
  line-height: 1.5715;
  @media (max-width: 575px) {
    justify-content: flex-start;
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

const StyledFieldSet = styled.fieldset`
  border: 1px solid rgba(81, 162, 238, 1);
  border-radius: 5px;
`

const StyledLegend = styled.legend`
  color: rgba(81, 162, 238, 1);
  margin: 0 5px;
`

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
      {props.error && (
        <span
          style={{
            fontFamily: "tahoma, arial, helvetica, sans-serif",
            fontSize: 11,
            color: "red",
          }}
        >
          {props.error}
        </span>
      )}
    </StyledFieldControl>
  )
}

export { Form }
