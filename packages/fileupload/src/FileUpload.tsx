import React, { useEffect, useState } from "react"
import {
  StyledLabel,
  StyledDiv,
  FileUl,
  FileLi,
  DeleteFileButton,
  Row,
  StyledText,
  UploadIcon,
} from "./styles"
import { LoadingImage, ExclamationImage } from "@jfront/ui-icons"

export interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange?: (name?: string, value?: any) => void
  value?: FileList
  error?: string
  isLoading?: boolean
  wrongMimeTypeError?: string
  label?: string
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      value,
      error,
      isLoading,
      wrongMimeTypeError,
      className,
      style,
      label,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [highlight, setHighlight] = useState(false)
    const [errorMessage, setErrorMessage] = useState(error)
    const innerRef = ref || React.createRef<HTMLInputElement>()

    useEffect(() => {
      if (errorMessage !== error) {
        setErrorMessage(error)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const handleFiles = (files: FileList | null) => {
      if (onChange) {
        if (props.multiple) {
          onChange(props.name, files != null ? files : undefined)
        } else {
          onChange(props.name, files != null ? files[0] : undefined)
        }
      }
    }

    const validateFileFormat = (files: FileList | null) => {
      if (!props.accept) {
        return true
      } else {
        if (files) {
          const mimeTypes = props.accept.replace(/\s/g, "").split(",")
          const valid = Array.from(files).every((file) => {
            return (
              mimeTypes.filter((accept) => {
                return (
                  new RegExp(accept).test(file.type) ||
                  file.name.endsWith(accept)
                )
              }).length > 0
            )
          })
          return valid
        }
        return true
      }
    }

    const onDropEvent = (
      e: React.DragEvent<HTMLDivElement>,
      highlight: boolean,
    ) => {
      e.preventDefault()
      e.stopPropagation()
      setHighlight(highlight)
    }

    return (
      <StyledDiv
        style={style}
        className={className}
        highlight={highlight}
        onDragEnter={(e) => {
          onDropEvent(e, true)
        }}
        onDragOver={(e) => {
          onDropEvent(e, true)
        }}
        onDragLeave={(e) => {
          onDropEvent(e, false)
        }}
        onDrop={(e) => {
          onDropEvent(e, false)
          const dt = e.dataTransfer
          const files = dt.files
          if (validateFileFormat(files)) {
            setErrorMessage(error || undefined)
            handleFiles(files)
          } else {
            setErrorMessage(
              wrongMimeTypeError
                ? wrongMimeTypeError
                : `Неверный тип файла, требуется: "${props.accept}"`,
            )
            handleFiles(null)
          }
        }}
      >
        <Row>
          <StyledLabel
            role="button"
            highlight={highlight}
            error={errorMessage != undefined}
          >
            <span>
              <UploadIcon />
            </span>
            {label ? label : "Выберите файл..."}
            <input
              style={{ display: "none" }}
              {...props}
              type="file"
              ref={innerRef}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </StyledLabel>
          {isLoading && <LoadingImage />}
          {errorMessage !== undefined && (
            <ExclamationImage title={errorMessage} />
          )}
        </Row>
        {value && (
          <FileUl>
            {props.multiple ? (
              Array.from(value).map((file, index) => {
                return (
                  <FileLi key={index}>
                    <StyledText title={file.name}>{file.name}</StyledText>
                    <DeleteFileButton
                      role="button"
                      onClick={() => {
                        if (onChange) {
                          const values = Array.from(value)
                          values.splice(values.indexOf(file), 1)
                          onChange(props.name, values)
                        }
                      }}
                    />
                  </FileLi>
                )
              })
            ) : (
              <FileLi key={1}>
                <StyledText title={(value as any).name}>
                  {(value as any).name}
                </StyledText>
                <DeleteFileButton
                  role="button"
                  onClick={() => {
                    if (onChange) {
                      onChange(props.name, undefined)
                    }
                  }}
                />
              </FileLi>
            )}
          </FileUl>
        )}
      </StyledDiv>
    )
  },
)
