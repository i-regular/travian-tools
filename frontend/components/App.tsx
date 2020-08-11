import React from "react";

import { PlayerForm } from "./Player-form";
import { ControlGroup } from "@blueprintjs/core";
import { IPlayerVillage } from "../src/calculate-distance";

interface IAppState {
  attackerVillage?: IPlayerVillage;
  targetVillages?: IPlayerVillage[];
  distances?: number[];
}

export class App extends React.PureComponent {
  private attacker: IPlayerVillage = {
    location: { x: 0, y: 0 },
  };
  public state: IAppState = {};

  public render(): JSX.Element {
    return (
      <div>
        <h1>Hello Heathens, this will be the best planning tool there is</h1>
        <ControlGroup fill={false} vertical={true}>
          <ControlGroup fill={false} vertical={false}>
            <PlayerForm name="Attacker village"></PlayerForm>
          </ControlGroup>
          <ControlGroup fill={false} vertical={false}>
            <PlayerForm name="Target village"></PlayerForm>
          </ControlGroup>
        </ControlGroup>
      </div>
    );
  }
}
