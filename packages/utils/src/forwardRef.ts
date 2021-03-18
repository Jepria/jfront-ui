import React from "react"
export interface ComponentWithAs<T extends React.ElementType, P> {
  <TT extends React.ElementType>(
    props: { as?: TT } & P &
      Omit<
        React.ComponentPropsWithRef<TT>,
        keyof React.ComponentPropsWithoutRef<T>
      >,
  ): JSX.Element
  displayName?: string
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  defaultProps?: never
  /**
   * propTypes are not supported on render functions
   */
  propTypes?: never
}

export function forwardRef<P, T extends React.ElementType>(
  component: (
    props: React.PropsWithChildren<P> &
      Omit<React.ComponentPropsWithoutRef<T>, keyof P> & {
        as?: React.ElementType
      },
    ref: ((instance: any) => void) | React.MutableRefObject<any> | null,
  ) => React.ReactNode,
) {
  return (React.forwardRef(component as any) as unknown) as ComponentWithAs<
    T,
    P
  >
}
