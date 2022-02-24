import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListModulesUseCase } from "./ListModulesUseCase";

class ListModulesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listModulesUseCase = container.resolve(ListModulesUseCase);

    const all = await listModulesUseCase.execute();

    return response.json(all);
  }
}

export { ListModulesController };
