import { ControlGroup, InputGroup, Label } from "@blueprintjs/core";
import React from "react";
import { parseMapLocationFromVillageLink } from "../src/parse-map-location";
import {
  IPlayerVillage,
  calculateDistance,
  calculateTravelTime,
  IMapLocation,
} from "../src/calculate-distance";

interface IPlayerFormProps {
  name: string;
  id: string;
  sendPlayerVillage(playerVillage: IPlayerVillage, id: string): void;
  attacker?: IPlayerVillage;
}

interface ITargetStats {
  distance: number;
  time: number;
}

export class TargetRow extends React.Component<IPlayerFormProps> {
  constructor(props: IPlayerFormProps) {
    super(props);
    this.villageLinkInputRef = React.createRef<HTMLInputElement>();
  }

  private villageLinkInputRef: React.RefObject<HTMLInputElement>;
  public state: IPlayerVillage = {
    location: {
      x: 0,
      y: 0,
    },
  };

  private _stats: ITargetStats = {
    distance: 0,
    time: 0,
  };

  private _calculateStats(targetVillage: IPlayerVillage) {
    if (this.props.attacker) {
      const distance = calculateDistance(this.props.attacker, targetVillage);
      const time = calculateTravelTime(distance, this.props.attacker);

      this._stats = { distance, time };
    }
  }

  private _setVillageLocation = () => {
    const villageInput = this.villageLinkInputRef.current;
    if (villageInput) {
      const villageLocation = parseMapLocationFromVillageLink(
        villageInput.value,
      );
      console.log(villageLocation);

      if (villageLocation !== null) {
        const targetVillage = { location: villageLocation };
        this.props.sendPlayerVillage(targetVillage, this.props.id);
        this._calculateStats(targetVillage);
        this.setState(targetVillage);
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
          onChange={this._setVillageLocation}
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
        <InputGroup value={`${this._stats.distance}`} readOnly={true} />
        <InputGroup value={`${this._stats.time}`} readOnly={true} />
      </ControlGroup>
    );
  }
}
