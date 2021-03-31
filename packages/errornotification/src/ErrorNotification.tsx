import React from "react"
import { ErrorDialog } from "@jfront/ui-dialog"
import {
  ACCESS_DENIED,
  AUTHORIZATION_FAILED,
  BadRequest,
  BAD_REQUEST,
  NetworkError,
  NotFound,
  NOT_FOUND,
  ServerError,
} from "@jfront/core-rest"

export interface ErrorNotificationProps {
  error?: NetworkError | Error | string | undefined
  header?: string
  log?: (error: any, info?: any) => void
  render?: (error: NetworkError | Error | string | undefined) => React.ReactNode
  onClose?: () => void
  children?: React.ReactNode
}

interface ErrorNotificationState {
  error: NetworkError | Error | string | undefined
}

export class ErrorNotification extends React.Component<
  ErrorNotificationProps,
  ErrorNotificationState
> {
  constructor(props: ErrorNotificationProps) {
    super(props)
    this.state = { error: props.error }

    window.onunhandledrejection = (e: PromiseRejectionEvent) => {
      console.error(e)
      if (this.props.log) {
        this.props.log(e)
      }
      this.setState({ error: e.reason })
    }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info)
    if (this.props.log) {
      this.props.log(error, info)
    }
  }

  render() {
    const { header = "Ошибка", children } = this.props
    const error = this.props.error || this.state.error
    let errorId, errorCode, errorMessage, errorDescription
    if (error) {
      if (this.props.render) {
        return this.props.render(error)
      }
      if (typeof error === "string") {
        errorDescription = error
      } else if ((error as NetworkError).type) {
        switch ((error as NetworkError).type) {
          case BAD_REQUEST: {
            errorCode = BAD_REQUEST
            errorDescription = "Неверный формат HTTP запроса"
            errorMessage = JSON.stringify(
              (error as BadRequest).constraintViolations,
            )
            break
          }
          case AUTHORIZATION_FAILED: {
            errorCode = AUTHORIZATION_FAILED
            errorDescription = "Ошибка авторизации"
            break
          }
          case ACCESS_DENIED: {
            errorCode = ACCESS_DENIED
            errorDescription = "Недостаточно прав доступа"
            break
          }
          case NOT_FOUND: {
            errorCode = NOT_FOUND
            errorDescription = (error as NotFound).url + " URL not found"
            break
          }
          default: {
            errorId = (error as ServerError).errorId
            errorCode = (error as ServerError).errorCode
            errorMessage = (error as ServerError).errorMessage
            break
          }
        }
      } else {
        errorMessage = (error as Error).stack
        errorDescription = (error as Error).message
      }
    }
    if (this.props.error || !error) {
      // error passed to props so render with children
      return (
        <>
          <ErrorDialog
            header={header}
            visible={error !== undefined || error !== null}
            errorId={errorId}
            errorCode={errorCode}
            errorMessage={errorMessage}
            errorDescription={errorDescription}
            onClose={() => {
              if (this.props.onClose) {
                this.props.onClose()
              }
              if (this.state.error) {
                this.setState({ error: undefined })
              }
            }}
          />
          {children}
        </>
      )
    } else if (this.state.error) {
      // error catched so render without children to prevent error render loop
      return (
        <ErrorDialog
          header={header}
          visible={error !== undefined}
          errorId={errorId}
          errorCode={errorCode}
          errorMessage={errorMessage}
          errorDescription={errorDescription}
          onClose={() => {
            if (this.props.onClose) {
              this.props.onClose()
            }
            this.setState({ error: undefined })
          }}
        />
      )
    }
  }
}
