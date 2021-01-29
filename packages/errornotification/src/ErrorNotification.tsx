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
    window.onerror = (msg, url, line, col, error) => {
      // Note that col & error are new to the HTML 5 spec and may not be
      // supported in every browser.
      let extra = !col ? "" : "\ncolumn: " + col
      extra += !error ? "" : "\nerror: " + error
      const log = "Error: " + msg + "\nurl: " + url + "\nline: " + line + extra
      // You can view the information in an alert to see things working like this:
      console.error(log)
      if (this.props.log) {
        if (error) {
          this.props.log(error, log)
        } else {
          this.props.log(log)
        }
      }
      const suppressErrorAlert = true
      // If you return true, then error alerts (like in older versions of
      // Internet Explorer) will be suppressed.
      if (error) {
        this.setState({ error })
      } else {
        this.setState({ error: log })
      }
      return suppressErrorAlert
    }

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
    const { error } = this.state
    if (error) {
      if (this.props.render) {
        return this.props.render(error)
      }
      let errorId, errorCode, errorMessage, errorDescription
      if (typeof error === "string") {
        errorMessage = error
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
      return (
        <>
          <ErrorDialog
            header={header}
            visible={error !== undefined}
            errorId={errorId}
            errorCode={errorCode}
            errorMessage={errorMessage}
            errorDescription={errorDescription}
            onClose={() => this.setState({ error: undefined })}
          />
          {children}
        </>
      )
    } else {
      return children
    }
  }
}
