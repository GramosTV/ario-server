import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SeoPagesService } from './seo-pages.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SeoPage } from './schemas/seo-pages.schema';

@Controller('seo-pages')
export class SeoPagesController {
  constructor(private readonly seoPagesService: SeoPagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() seoPage: SeoPage) {
    return await this.seoPagesService.create(seoPage);
  }

  @Get()
  findAll() {
    return this.seoPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoPagesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() seoPage: SeoPage) {
    return await this.seoPagesService.update(id, seoPage);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seoPagesService.remove(+id);
  }
}
