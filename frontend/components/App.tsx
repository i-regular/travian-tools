import React from "react";

import { PlayerForm } from "./Player-form";
import { ControlGroup } from "@blueprintjs/core";
import { IPlayerVillage } from "../src/calculate-distance";

interface IAppState {
  attackerVillage?: IPlayerVillage;
  targetVillages?: IPlayerVillage[];
  distances?: number[];
}

export class App extends React.Component {
  private _getAttackerPlayerVillage(playerVillage: IPlayerVillage): void {
    const newState = this.state;
    newState.attackerVillage = playerVillage;
    this.setState(newState);
  }

  private _getDefenderPlayerVillage(playerVillage: IPlayerVillage): void {
    const newState = this.state;
    if (newState.targetVillages === undefined) {
      newState.targetVillages = [playerVillage];
    } else {
      newState.targetVillages.push(playerVillage);
    }
    this.setState(newState);
  }

  public state: IAppState = {};

  public render(): JSX.Element {
    return (
      <div>
        <h1>Hello Heathens, this will be the best planning tool there is</h1>
        <ControlGroup fill={false} vertical={true}>
          <ControlGroup fill={false} vertical={false}>
            <PlayerForm
              name="Attacker village"
              id="attacker"
              sendPlayerVillage={this._getAttackerPlayerVillage.bind(this)}
            ></PlayerForm>
          </ControlGroup>
          <ControlGroup fill={false} vertical={false}>
            <PlayerForm
              name="Target village"
              id="target"
              sendPlayerVillage={this._getDefenderPlayerVillage.bind(this)}
              attacker={this.state.attackerVillage}
            ></PlayerForm>
          </ControlGroup>
        </ControlGroup>
      </div>
    );
  }
}
