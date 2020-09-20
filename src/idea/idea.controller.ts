import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IdeaDTO } from "./idea.dto";
import { IdeaService } from "./idea.service";

@Controller('idea')
export class IdeaController {

  constructor(private ideaService: IdeaService) {}

  @Get()
  listIdeas() {
    return this.ideaService.findAll();
  }

  @Get(':id')
  findIdea(@Param('id') id: string) {
    return this.ideaService.findOne(id);
  }

  @Post()
  createIdea(@Body() idea: IdeaDTO) {
    return this.ideaService.store(idea);
  }

  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() idea: Partial<IdeaDTO>) {
    return this.ideaService.update(id, idea);
  }

  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }



}