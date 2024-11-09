import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCertificateDto {
    @ApiProperty({ description: 'The full name of the certificate holder' })
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({ description: 'The company associated with the certificate' })
    @IsNotEmpty()
    @IsString()
    company: string;

    @ApiProperty({ description: 'A description of the certificate', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'The title of the certificate' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    keyCert: string;
}
