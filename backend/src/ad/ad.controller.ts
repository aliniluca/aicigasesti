import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { createErrorResponse } from 'src/utils/common/response.util';
import { AccessTokenAuthGuard } from 'src/guards/access-token-auth.guard';

@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  @UseGuards(AccessTokenAuthGuard)
  async create(@Body() createAdDto: CreateAdDto, @Req() request: Request) {
    const user = request.user as { sub: number }; // Type assertion for the user
    if (!user || !user.sub) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }
    // Set the createdById field using user.sub
    const adDtoWithUser = {
      ...createAdDto,
      createdById: user.sub, // Assign user.sub to createdById
    };

    try {
      return await this.adService.create(adDtoWithUser);
    } catch (error: any) {
      throw new HttpException(
        createErrorResponse('Error creating ad', error.message || 'Unknown error occurred'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.adService.findAll();
    } catch (error: any) {
      throw new HttpException(
        createErrorResponse('Error fetching ads', error.message || 'Unknown error occurred'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.adService.findOne(id);
    } catch (error: any) {
      throw new HttpException(
        createErrorResponse('Error fetching ad', error.message || 'Unknown error occurred'),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    try {
      return await this.adService.update(id, updateAdDto);
    } catch (error: any) {
      throw new HttpException(
        createErrorResponse('Error updating ad', error.message || 'Unknown error occurred'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.adService.remove(id);
    } catch (error: any) {
      throw new HttpException(
        createErrorResponse('Error deleting ad', error.message || 'Unknown error occurred'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('category/:categorySlug/subcategory/:subcategorySlug')
  async findAdsBySubcategory(
    @Param('categorySlug') categorySlug: string,
    @Param('subcategorySlug') subcategorySlug: string,
  ) {
    console.log(`Received request for category: ${categorySlug}, subcategory: ${subcategorySlug}`);

    try {
      const ads = await this.adService.findAdsBySubcategorySlug(categorySlug, subcategorySlug);
      return {
        data: ads,
        message: 'Ads fetched successfully',
        status: 'success',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          message: 'Error fetching ads by subcategory',
          error: error.message || 'Unknown error occurred',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
