import { ControlGroup, InputGroup, Label } from "@blueprintjs/core";
import React from "react";
import { parseMapLocationFromVillageLink } from "../src/parse-map-location";
import { IPlayerVillage, calculateDistance } from "../src/calculate-distance";

interface IPlayerFormProps {
  name: string;
  id: string;
  sendPlayerVillage(playerVillage: IPlayerVillage): void;
  attacker?: IPlayerVillage;
}

export class PlayerForm extends React.Component<IPlayerFormProps> {
  constructor(props: IPlayerFormProps) {
    super(props);
  }

  public state: IPlayerVillage = {
    location: {
      x: 0,
      y: 0,
    },
  };

  private _distanceInput: JSX.Element | null = null;

  private setVillageLocation = () => {
    const linkElement = document.querySelector(
      `#${this.props.id}`,
    ) as HTMLInputElement;
    const villageLocation = parseMapLocationFromVillageLink(linkElement.value);
    console.log(villageLocation);

    if (villageLocation !== null) {
      this.props.sendPlayerVillage({ location: villageLocation });
      this.setState({ location: villageLocation });
      if (this.props.attacker) {
        const distance = calculateDistance(this.props.attacker, {
          location: villageLocation,
        });
        this._distanceInput = (
          <InputGroup value={`${distance}`} readOnly={true} />
        );
      }
    }
  };

  public render(): JSX.Element {
    return (
      <ControlGroup fill={false} vertical={false}>
        <Label htmlFor="link">{this.props.name}</Label>
        <InputGroup
          id={this.props.id}
          placeholder="Village link"
          onChange={this.setVillageLocation}
        />
        <Label htmlFor="x">X:</Label>
        <InputGroup
          id="x"
          placeholder="x"
          readOnly={true}
          value={`${this.state.location.x}`}
        />
        <Label htmlFor="y">Y:</Label>
        <InputGroup
          id="y"
          placeholder="y"
          readOnly={true}
          value={`${this.state.location.y}`}
        />
        {this._distanceInput}
      </ControlGroup>
    );
  }
}
