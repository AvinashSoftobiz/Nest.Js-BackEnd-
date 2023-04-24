import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Avinashkumar:Aman123@cluster0.gzpb0dy.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CountryModule,
  ],
})
export class AppModule {}
