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
          <span>{currentRecord?.id}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>name</Form.Label>
        <Form.Control>
          <span>{currentRecord?.name}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>description</Form.Label>
        <Form.Control>
          <span>{currentRecord?.description}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>code</Form.Label>
        <Form.Control>
          <span>{currentRecord?.code}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>status</Form.Label>
        <Form.Control>
          <span>{currentRecord?.status}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>cities</Form.Label>
        <Form.Control>
          <span>{currentRecord?.cities?.join(", ")}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>categories</Form.Label>
        <Form.Control>
          <span>{currentRecord?.categories?.join(", ")}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>types</Form.Label>
        <Form.Control>
          <span>{currentRecord?.types?.join(", ")}</span>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>activeDate</Form.Label>
        <Form.Control>
          <span>
            {currentRecord?.activeDate
              ? new Date(currentRecord?.activeDate).toLocaleDateString()
              : ""}
          </span>
        </Form.Control>
      </Form.Field>
    </Form>
  )
}
export default Page
