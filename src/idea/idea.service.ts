import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {

  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>
  )
  {}

  async store(idea: IdeaDTO) {
    const newIdea = this.ideaRepository.create(idea)

    await this.ideaRepository.save(newIdea)

    return newIdea;
  }

  async findOne(id: string) {
    const idea = await this.ideaRepository.findOne({ where: { id, deletedAt: IsNull() } });

    if (!idea) {
      throw Error('No idea found with the informed ID.');
    }

    return idea;
  }

  async findAll() {
    return await this.ideaRepository.find({ where: { deletedAt: IsNull() } });
  }

  async update(id: string, idea: Partial<IdeaDTO>) {
    const storedIdea = await this.ideaRepository.findOne({ where: { id, deletedAt: IsNull() } });

    if (!storedIdea) {
      throw Error('No idea found with the informed ID.');
    }

    await this.ideaRepository.update({ id }, idea);

    return idea;
  }

  async destroy(id: string) {
    const storedIdea = await this.ideaRepository.findOne({ where: { id, deletedAt: IsNull() } });

    if (!storedIdea) {
      throw Error('No idea found with the informed ID.');
    }

    await this.ideaRepository.softDelete({ id });

    return id;
  }
}