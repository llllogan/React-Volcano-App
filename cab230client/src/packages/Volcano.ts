import CountryToIsoCode from "./ISOCountryName";
import { LatLngTuple } from "leaflet";
import { IVolcano } from "./Interfaces";

export default class Volcano {
  Id?: number;
  Name: string;
  Country: string;
  Region: string;
  Subregion: string;
  LastEruption?: string;
  Summit?: number;
  Elevation?: number;
  Latitude?: number;
  Longitude?: number;
  PopulationWithin5km?: number;
  PopulationWithin10km?: number;
  PopulationWithin30km?: number;
  PopulationWithin100km?: number;
  Code?: string;

  // Constructor for individual volcano with population data
  constructor(data: IVolcano) {
    this.Id = data.id;
    this.Name = data.name;
    this.Country = data.country;
    this.Region = data.region;
    this.Subregion = data.subregion;
    this.LastEruption = data.last_eruption;
    this.Summit = data.summit;
    this.Elevation = data.elevation;
    this.Latitude = data.latitude;
    this.Longitude = data.longitude;
    this.PopulationWithin5km = data.population_5km;
    this.PopulationWithin10km = data.population_10km;
    this.PopulationWithin30km = data.population_30km;
    this.PopulationWithin100km = data.population_100km;

    this.Code = CountryToIsoCode(this.Country);
  }

  // Get the volcano's id
  public getId() {

    if (this.Id == undefined) {
      throw new Error("Volcano ID is undefined");
    }

    return this.Id;
  }

  public getLatLngTuple(): LatLngTuple {
    if (this.Latitude === undefined || this.Longitude === undefined) {
      return [0, 0];
    }

    return [this.Latitude, this.Longitude];
  }

  public hasPopulationData(): boolean {
    return (
      this.PopulationWithin5km !== undefined ||
      this.PopulationWithin10km !== undefined ||
      this.PopulationWithin30km !== undefined ||
      this.PopulationWithin100km !== undefined
    );
  }

  public getPopulationData(): number[] {
    return [
      this.PopulationWithin5km ?? 0,
      this.PopulationWithin10km ?? 0,
      this.PopulationWithin30km ?? 0,
      this.PopulationWithin100km ?? 0,
    ];
  }

  public getSummit(): string {
    if (this.Summit === undefined) {
      return "Unknown";
    }

    return this.Summit.toString();
  }

  public getElevation(): string {
    if (this.Elevation === undefined) {
      return "Unknown";
    }

    return this.Elevation.toString();
  }

  public getLastEruption(): string {
    if (this.LastEruption === undefined) {
      return "Unknown";
    }

    return this.LastEruption;
  }
}
