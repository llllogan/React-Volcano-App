import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';


class Volcano {

    @Expose({ name: 'id' })
    @IsNumber()
    Id: number;

    @Expose({ name: 'name' })
    @IsString()
    Name: string;

    @Expose({ name: 'country' })
    @IsString()
    Country: string;

    @Expose({ name: 'region' })
    @IsString()
    Region: string;

    @Expose({ name: 'subregion' })
    @IsString()
    Subregion: string;

    @Expose({ name: 'last_eruption' })
    @IsString()
    LastEruption: string;

    @Expose({ name: 'summit' })
    @IsNumber()
    Summit: number;

    @Expose({ name: 'elevation' })
    @IsNumber()
    Elevation: number;

    @Expose({ name: 'latitude' })
    @IsNumber()
    Latitude: number;

    @Expose({ name: 'longitude' })
    @IsNumber()
    Longitude: number;

    @Expose({ name: 'population_5km' })
    @IsNumber()
    PopulationWithin5km: number;

    @Expose({ name: 'population_10km' })
    @IsNumber()
    PopulationWithin10km: number;

    @Expose({ name: 'population_30km' })
    @IsNumber()
    PopulationWithin30km: number;

    @Expose({ name: 'population_100km' })
    @IsNumber()
    PopulationWithin100km: number;

    constructor(
        Id: number, 
        Name: string, 
        Country: string, 
        Region: string, 
        Subregion: string, 
        LastEruption: string, 
        Summit: number, 
        Elevation: number, 
        Latitude: number, 
        Longitude: number, 
        PopulationWithin5km: number, 
        PopulationWithin10km: number, 
        PopulationWithin30km: number, 
        PopulationWithin100km: number
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Country = Country;
        this.Region = Region;
        this.Subregion = Subregion;
        this.LastEruption = LastEruption;
        this.Summit = Summit;
        this.Elevation = Elevation;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.PopulationWithin5km = PopulationWithin5km;
        this.PopulationWithin10km = PopulationWithin10km;
        this.PopulationWithin30km = PopulationWithin30km;
        this.PopulationWithin100km = PopulationWithin100km;
    }
}