export const toLocaleDate = (isoString?: string) => {
  return isoString ? new Date(isoString).toLocaleDateString() : ""
}

export const toIsoDateString = (date?: Date) => {
  return date
    ? new Date(
        (date as Date).getTime() - (date as Date).getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 10)
    : ""
}
