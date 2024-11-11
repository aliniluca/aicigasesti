import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import slugify from 'slugify';

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const slug = slugify(createSubcategoryDto.name, { lower: true });
    return this.prisma.subcategory.create({
      data: { ...createSubcategoryDto, slug },
    });
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.prisma.subcategory.update({
      where: { id },
      data: updateSubcategoryDto,
    });
  }

  async findAll() {
    return this.prisma.subcategory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.subcategory.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { slug },
    });
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    return subcategory;
  }

  async findAllSubcategoriesByCategoryId(categoryId: string) {
    return this.prisma.subcategory.findMany({
      where: { categoryId },
    });
  }

  async remove(id: string) {
    return this.prisma.subcategory.delete({
      where: { id },
    });
  }
}
