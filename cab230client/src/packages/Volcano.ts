import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';


class Volcano {

    @Expose({ name: 'id' })
    @IsNumber()
    Id!: number;

    @Expose({ name: 'name' })
    @IsString()
    Name!: string;

    @Expose({ name: 'country' })
    @IsString()
    Country!: string;

    @Expose({ name: 'region' })
    @IsString()
    Region!: string;

    @Expose({ name: 'subregion' })
    @IsString()
    Subregion!: string;

    @Expose({ name: 'last_eruption' })
    @IsString()
    LastEruption!: string;

    @Expose({ name: 'summit' })
    @IsNumber()
    Summit!: number;

    @Expose({ name: 'elevation' })
    @IsNumber()
    Elevation!: number;

    @Expose({ name: 'latitude' })
    @IsNumber()
    Latitude!: number;

    @Expose({ name: 'longitude' })
    @IsNumber()
    Longitude!: number;

    @Expose({ name: 'population_5km' })
    @IsNumber()
    PopulationWithin5km: number | undefined;

    @Expose({ name: 'population_10km' })
    @IsNumber()
    PopulationWithin10km: number | undefined;

    @Expose({ name: 'population_30km' })
    @IsNumber()
    PopulationWithin30km: number | undefined;

    @Expose({ name: 'population_100km' })
    @IsNumber()
    PopulationWithin100km: number | undefined;

}

export default Volcano;