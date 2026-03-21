import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Public } from "../auth/public.decorator";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Returns the full list of all available listing categories.
  @Public()
  @ApiOperation({ summary: 'Kategóriák elérése' })
  @ApiOkResponse({
    description: 'Kategóriák listája',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id:       { type: 'number', example: 1 },
          name:     { type: 'string', example: 'Home & Maintenance' },
          slug:     { type: 'string', example: 'home-maintenance' },
          imageUrl: { type: 'string', nullable: true, example: '/uploads/categories/Home%20%26%20Maintenance.jpg' },
        },
      },
    },
  })
  @Get()
  getAll() {
    return this.categoryService.findAll();
  }
}
