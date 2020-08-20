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
  private villageLinkInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IPlayerFormProps) {
    super(props);
    this.villageLinkInputRef = React.createRef<HTMLInputElement>();
  }
  public state: IPlayerVillage = {
    // locations:
    location: {
      x: 0,
      y: 0,
    },
  };
  private _distanceInput: JSX.Element | null = null;
  private setVillageLocation = () => {
    const villageInput = this.villageLinkInputRef.current;
    if (villageInput) {
      const villageLocation = parseMapLocationFromVillageLink(villageInput.value);
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
    }
  };
  public render(): JSX.Element {
    return (
      <ControlGroup fill={false} vertical={false}>
        <Label htmlFor="link">{this.props.name}</Label>
          <input
            ref={this.villageLinkInputRef}
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
