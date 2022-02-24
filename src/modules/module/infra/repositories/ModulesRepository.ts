import { ICreateModuleDtos } from "@modules/module/dtos/ICreateModuleDtos";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { getRepository, Repository } from "typeorm";
import { Module } from "../entities/Module";

class ModulesRepository implements IModulesRepository {
  private repository: Repository<Module>;

  constructor() {
    this.repository = getRepository(Module);
  }

  async create({
    name,
    description,
    duration,
    course_id,
    id,
  }: ICreateModuleDtos): Promise<void> {
    const create = this.repository.create({
      name,
      description,
      duration,
      course_id,
      id,
    });

    await this.repository.save(create);
  }

  async findByName(name: string): Promise<Module> {
    return await this.repository.findOne({ name });
  }

  async findById(id: string): Promise<Module> {
    return await this.repository.findOne({ id });
  }

  async findAll(): Promise<Module[]> {
    const all = await this.repository.find();

    return all;
  }
}

export { ModulesRepository };
