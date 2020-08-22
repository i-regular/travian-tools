import React from "react";
import { PlayerForm } from "./Player-form";
import { ControlGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { IPlayerVillage } from "../src/calculate-distance";
import { TargetRow } from "./Target-form-row";
interface IAttacker {
  attackerVillage?: IPlayerVillage;
  targetVillages: string[];
}
interface IAttackers {
  [id: string]: IAttacker;
}
interface IAppState {
  // TODO: Move targetVillages to IAttacker interface
  targetVillages?: IPlayerVillage[];
  attackers: IAttackers;
}
export class App extends React.Component<any, IAppState> {
  state: IAppState = { attackers: {} };

  _getAttackerPlayerVillage = (
    attackerVillage: IPlayerVillage,
    attackerId: string,
  ): void => {
    this.setState({
      attackers: {
        ...this.state.attackers,
        [attackerId]: {
          attackerVillage,
          targetVillages: [...this.state.attackers[attackerId].targetVillages],
        },
      },
    });
  };

  _getDefenderPlayerVillage = (playerVillage: IPlayerVillage): void => {
    const newState = this.state;
    if (newState.targetVillages === undefined) {
      newState.targetVillages = [playerVillage];
    } else {
      newState.targetVillages.push(playerVillage);
    }
    this.setState(newState);
  };

  addAttacker = (): void => {
    const newAttackerID = `${Date.now()}`;
    this.setState({
      attackers: {
        ...this.state.attackers,
        [newAttackerID]: { targetVillages: [] },
      },
    });
  };

  addTarget = (attackerId: string): void => {
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
                  sendPlayerVillage={this._getAttackerPlayerVillage}
                />
              </ControlGroup>
              {this.state.attackers[attacker].targetVillages &&
                this.state.attackers[attacker].targetVillages?.map(
                  (targetVillage) => {
                    return (
                      <ControlGroup fill={false} vertical={false}>
                        <TargetRow
                          name={targetVillage}
                          id={targetVillage}
                          sendPlayerVillage={this._getDefenderPlayerVillage}
                          attacker={
                            this.state.attackers[attacker].attackerVillage
                          }
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
