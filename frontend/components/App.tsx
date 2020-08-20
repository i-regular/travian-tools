import React from "react";
import { PlayerForm } from "./Player-form";
import { ControlGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { IPlayerVillage } from "../src/calculate-distance";
interface Attacker {
  targetVillages: string[];
}
interface Attackers {
  [id: string]: Attacker;
}
interface IAppState {
  attackerVillage?: IPlayerVillage;
  targetVillages?: IPlayerVillage[];
  distances?: number[];
  attackers: Attackers;
}
export class App extends React.Component<any, IAppState> {
  state: IAppState = { attackers: {} };
  private _getAttackerPlayerVillage(playerVillage: IPlayerVillage): void {
    const newState = this.state;
    newState.attackerVillage = playerVillage;
    this.setState(newState);
  }
  _getDefenderPlayerVillage = (playerVillage: IPlayerVillage) => {
    const newState = this.state;
    if (newState.targetVillages === undefined) {
      newState.targetVillages = [playerVillage];
    } else {
      newState.targetVillages.push(playerVillage);
    }
    this.setState(newState);
  };
  addAttacker = () => {
    const newAttacker = `${Date.now()}`;
    this.setState({
      attackers: {
        ...this.state.attackers,
        [newAttacker]: { targetVillages: [] },
      },
    });
  };
  addTarget = (attackerId: string) => {
    this.setState({
      attackers: {
        ...this.state.attackers,
        [attackerId]: {
          targetVillages: [
            ...this.state.attackers[attackerId].targetVillages,
            "",
          ],
        },
      },
    });
  };
  public render(): JSX.Element {
    return (
      <div>
        <h1>Hello Heathens, this will be the best planning tool there is</h1>
        <button type="button" onClick={this.addAttacker}>
          Add attacker
        </button>
        {Object.keys(this.state.attackers).map((attacker) => {
          return (
            <ControlGroup fill={false} vertical={true}>
              <ControlGroup fill={false} vertical={false}>
                <PlayerForm
                  name={attacker}
                  id={attacker}
                  sendPlayerVillage={this._getAttackerPlayerVillage.bind(this)}
                />
              </ControlGroup>
              {this.state.attackers[attacker].targetVillages &&
                this.state.attackers[attacker].targetVillages?.map(
                  (targetVillage) => {
                    return (
                      <ControlGroup fill={false} vertical={false}>
                        <PlayerForm
                          name={targetVillage}
                          id={targetVillage}
                          sendPlayerVillage={this._getDefenderPlayerVillage}
                          attacker={this.state.attackerVillage}
                        />
                      </ControlGroup>
                    );
                  },
                )}
              <button
                onClick={() => {
                  this.addTarget(attacker);
                }}
              >
                Add target
              </button>
            </ControlGroup>
          );
        })}
      </div>
    );
  }
}
