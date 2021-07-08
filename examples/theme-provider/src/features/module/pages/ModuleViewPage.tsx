import React from "react"
import { Form } from "@jfront/ui-core"
import { useSelector } from "react-redux"
import { AppState } from "../../../app/store/reducer"
import styled from "styled-components"

const Text = styled.div`
  display: inline;
  min-height: 20px;
  max-width: 200px;
  width: 100%;
  padding: 2px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.textColor};
  word-wrap: normal;
`

const Page = () => {
  const { currentRecord } = useSelector(
    (state: AppState) => state.module.crudSlice,
  )
  return (
    <Form>
      <Form.Field>
        <Form.Label>id</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.id}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>name</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.name}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>description</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.description}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>code</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.code}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>status</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.status}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>cities</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.cities?.join(", ")}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>categories</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.categories?.join(", ")}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>types</Form.Label>
        <Form.Control>
          <Text>{currentRecord?.types?.join(", ")}</Text>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>activeDate</Form.Label>
        <Form.Control>
          <Text>
            {currentRecord?.activeDate
              ? new Date(currentRecord?.activeDate).toLocaleDateString()
              : ""}
          </Text>
        </Form.Control>
      </Form.Field>
    </Form>
  )
}
export default Page
