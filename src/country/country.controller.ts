import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Patch,
  
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './country.schema';
import { CountryService } from './CountryService';


@Controller('country')
export class CountryController {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
    private countryService: CountryService,
  ) {}

  // Insert
  @Post()
  async createCountry(
    @Body('name') name: string,
    @Body('shortcode') shortcode: string,
  ) {
    const newCountry = new this.countryModel({ name, shortcode });
    return await newCountry.save();
  }

  // get all
  @Get()
  async getCountries() {
    return await this.countryModel.find().exec();
  }

  // Search country by name
  @Get(':name')
  async getCountryByName(@Param('name') name: string) {
    const country = await this.countryService.getCountryByName(name);
    if (!country) {
      throw new NotFoundException(`Country with name "${name}" not found`);
    }
    return { country };
  }

  // delete By Id
  @Delete(':id')
  async deleteCountry(@Param('id') id: string) {
    const deletedCountry = await this.countryService.deleteCountry(id);
    if (!deletedCountry) {
      throw new NotFoundException(`Country with id "${id}" not found`);
    }
    return { message: `Country with id "${id}" deleted successfully` };
  }

  //update by Id
  @Patch(':id')
  async updateCountryById(
    @Param('id') id: string,
    @Body() updatedFields: Partial<Country>,
  ): Promise<Country> {
    return this.countryService.updateCountryById(id, updatedFields);
  }

  // to search all countries that contain a word
  @Get('search/:keyword')
  async searchByKeyword(@Param('keyword') keyword: string): Promise<Country[]> {
    return this.countryService.searchByKeyword(keyword);
  }

  // Delete multiple countries by their shortcode
  @Delete('shortcode/:shortcode')
  async deleteByShortcode(
    @Param('shortcode') shortcode: string,
  ): Promise<void> {
    return this.countryService.deleteByShortcode(shortcode);
  }
}
