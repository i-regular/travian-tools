import { ControlGroup, InputGroup, Label } from "@blueprintjs/core";
import React from "react";
import { parseMapLocationFromVillageLink } from "../src/parse-map-location";
import { IPlayerVillage } from "../src/calculate-distance";

interface IPlayerFormProps {
  name: string;
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

  private setVillageLocation = () => {
    const linkElement = document.querySelector("#link") as HTMLInputElement;
    const villageLocation = parseMapLocationFromVillageLink(linkElement.value);
    console.log(villageLocation);

    if (villageLocation !== null) {
      this.setState({ location: villageLocation });
    }
  };

  public render(): JSX.Element {
    return (
      <ControlGroup fill={false} vertical={false}>
        <Label htmlFor="link">{this.props.name}</Label>
        <InputGroup
          id="link"
          placeholder="Attacker link"
          onChange={this.setVillageLocation}
        />
        <Label htmlFor="x">X:</Label>
        <InputGroup
          id="x"
          placeholder="x"
          disabled={true}
          value={`${this.state.location.x}`}
        />
        <Label htmlFor="y">Y:</Label>
        <InputGroup
          id="y"
          placeholder="y"
          disabled={true}
          value={`${this.state.location.y}`}
        />
      </ControlGroup>
    );
  }
}
