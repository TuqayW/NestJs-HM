import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  providers: [CertificateService],
  controllers: [CertificateController],
  exports: [CertificateService]
})
export class CertificateModule {}
