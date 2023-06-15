import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT), // should be a number
      database: process.env.DB_NAME, // database name
      username: process.env.DB_USERNAME, // database username
      password: process.env.DB_PASS, // password of the database
      autoLoadEntities: true, // it's very important
      synchronize: true, // more important, synconize the database
    }),
    
    UsersModule,
    
    CountriesModule
  
  ],
})
export class AppModule {}
