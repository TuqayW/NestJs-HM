import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService], 
      useFactory : (configService: ConfigService) => ({
        type : 'mongodb',
        url : configService.get<string>('DATABASE_CONNECTION_STRING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
      })
    }),
    UserModule,
    AuthModule,
    CertificateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
