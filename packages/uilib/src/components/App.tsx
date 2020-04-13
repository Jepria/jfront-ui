import React from "react";
import { Hello } from "./Hello";

type Props = {};

export const App: React.FC<Props> = props => {
  const [name, setName] = React.useState('Moscow');
  return (
    <div>
      <Hello {...{name}}/>
    </div>
  )
}
