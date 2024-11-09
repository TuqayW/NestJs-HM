import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './certificate.entity';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificateService {
    constructor(
        @InjectRepository(Certificate)
        private readonly CertificateRepository: Repository<Certificate>
    ) { }

    async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
        const certificate = this.CertificateRepository.create(createCertificateDto)
        return await this.CertificateRepository.save(certificate)
    }

    async findAll(): Promise<Certificate[]> {
        return await this.CertificateRepository.find();
    }

    async findById(id: string): Promise<Certificate> {
        const cert = await this.CertificateRepository.findOneBy({ id });
        if (!cert) throw new NotFoundException(`Certificate not found id: ${id}`)
        return cert
    }

    async verifyCertificate(key_Cert: string): Promise<Certificate> {
        const cert = await this.CertificateRepository.findOneBy({ key_Cert });
        if (!cert) throw new NotFoundException(`Certificate not found key_Cert: ${key_Cert}`)
        return cert
    }

    async deleteById(id: string): Promise<boolean> {
        const cert = await this.CertificateRepository.findOneBy({ id });
        if (!cert) throw new NotFoundException(`Certificate not found id: ${id}`)
        await this.CertificateRepository.delete(id)
        return true
    }

    async updatebyId(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificate> {
        const cert = await this.CertificateRepository.findOneBy({ id });
        if (!cert) throw new NotFoundException(`Certificate not found id: ${id}`)
        await this.CertificateRepository.update(id,updateCertificateDto)
        return this.findById(id)
    }

}
