import { Controller, Body, Post, Param, Request, UseGuards, Get, UnauthorizedException, Put, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@ApiTags('certificate')
@Controller('certificate')
export class CertificateController {
    constructor(
        private readonly certificateService: CertificateService,
        private readonly authService: AuthService
    ) {}

    @Post('createCertificate')
    @ApiOperation({ summary: 'Create a new certificate' })
    @ApiBody({ type: CreateCertificateDto })
    @ApiResponse({ status: 201, description: 'Certificate successfully created.' })
    async create(@Body() createCertificateDto: CreateCertificateDto, @Request() req) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const user = await this.authService.validateUserFromToken(token);

        if (!user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return await this.certificateService.create(createCertificateDto);
    }

    @Get('findAll')
    @ApiOperation({ summary: 'Get all certificates' })
    @ApiResponse({ status: 200, description: 'Return all certificates.' })
    async findAll() {
        return await this.certificateService.findAll();
    }

    @Get('findById/:id')
    @ApiOperation({ summary: 'Find a certificate by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the certificate' })
    @ApiResponse({ status: 200, description: 'Return the certificate with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Certificate not found.' })
    async findById(@Param('id') id: string) {
        return await this.certificateService.findById(id);
    }

    @Put('updateById/:id')
    @ApiOperation({ summary: 'Update a certificate by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the certificate to update' })
    @ApiBody({ type: UpdateCertificateDto })
    @ApiResponse({ status: 200, description: 'Certificate successfully updated.' })
    @ApiResponse({ status: 404, description: 'Certificate not found.' })
    async updateById(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
        return await this.certificateService.updatebyId(id, updateCertificateDto);
    }

    @Delete('deleteById/:id')
    @ApiOperation({ summary: 'Delete a certificate by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the certificate to delete' })
    @ApiResponse({ status: 200, description: 'Certificate successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Certificate not found.' })
    async deleteById(@Param('id') id: string) {
        return await this.certificateService.deleteById(id);
    }

    @Get('verifyCertificate/:id')
    @ApiOperation({ summary: 'Verify a certificate by key' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the certificate to verify' })
    @ApiBody({ schema: { type: 'object', properties: { key_cert: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Certificate verified.' })
    @ApiResponse({ status: 400, description: 'Verification failed.' })
    async verifyCertificate(@Param('id') id: string, @Body('key_cert') key_cert: string) {
        return await this.certificateService.verifyCertificate(key_cert);
    }
}
