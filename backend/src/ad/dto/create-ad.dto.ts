import { IsString, IsNumber, IsBoolean, IsEnum, IsOptional, IsInt } from 'class-validator';
import { AdType, AdStatus } from '@prisma/client';

export class CreateAdDto {
  @IsString()
  title: string = '';

  @IsString()
  description: string='';

  @IsNumber()
  price: number = 0;

  @IsNumber()
  minimumPrice: number = 0;

  @IsEnum(AdType)
  type: AdType = AdType.VAND;

  @IsBoolean()
  acceptMessages: boolean = true;

  @IsString()
  location: string = '';

  @IsOptional()
  @IsEnum(AdStatus)
  adStatus: AdStatus = AdStatus.ACTIV;

  @IsString()
  categoryId: string = '';

  @IsString()
  subcategoryId: string = '';

  @IsOptional() // Optional field, will be included from the extracted sub from the request
  @IsInt()
  createdById?: number;

  @IsOptional()
  @IsString({ each: true })
  mediaIds?: string[];

  @IsOptional()
  @IsInt()
  numberOfImpressions?: number = 0; 

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
