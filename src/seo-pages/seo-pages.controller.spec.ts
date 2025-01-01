import { Test, TestingModule } from '@nestjs/testing';
import { SeoPagesController } from './seo-pages.controller';
import { SeoPagesService } from './seo-pages.service';

describe('SeoPagesController', () => {
  let controller: SeoPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoPagesController],
      providers: [SeoPagesService],
    }).compile();

    controller = module.get<SeoPagesController>(SeoPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
