import { Test, TestingModule } from '@nestjs/testing';
import { SeoPagesService } from './seo-pages.service';

describe('SeoPagesService', () => {
  let service: SeoPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoPagesService],
    }).compile();

    service = module.get<SeoPagesService>(SeoPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
