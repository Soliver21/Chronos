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
  @ApiOperation({summary:"Kategóriák elérése"})
  @ApiOkResponse({description:"Kategóriák listája"})
  @Get()
  getAll() {
    return this.categoryService.findAll();
  }
}
