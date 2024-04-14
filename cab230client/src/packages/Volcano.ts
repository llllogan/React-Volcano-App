import CountryToIsoCode from "./ISOCountryName";
import { LatLngTuple } from "leaflet";

export default class Volcano {
  Name: string;
  Country: string;
  Region: string;
  Subregion: string;
  Id?: number;
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
  constructor(data: {
    name: string;
    country: string;
    region: string;
    subregion: string;
    id?: number;
    last_eruption?: string;
    summit?: number;
    elevation?: number;
    latitude?: number;
    longitude?: number;
    population_5km?: number;
    population_10km?: number;
    population_30km?: number;
    population_100km?: number;
  }) {
    this.Name = data.name;
    this.Country = data.country;
    this.Region = data.region;
    this.Subregion = data.subregion;
    this.Id = data.id;
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

    if (this.Id === undefined) {
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
}
