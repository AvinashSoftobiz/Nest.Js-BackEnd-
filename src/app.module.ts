import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CountryModule,
  ],
})
export class AppModule {}
