import { inject, injectable } from "tsyringe";
import { ICreateCourseDtos } from "@modules/courses/dtos/ICreateCourseDtos";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { createCourseSchemeValidate } from "@modules/courses/validations";

@injectable()
class UpdateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({
    id,
    name,
    description,
    category_id,
  }: ICreateCourseDtos): Promise<Course> {
    if (!(await createCourseSchemeValidate.isValid({ name, category_id }))) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError("Courses does not exists!");
    }

    if (name !== course.name) {
      const course = await this.coursesRepository.findByName(name);

      if (course) {
        throw new AppError("Course already exists!");
      }
    }

    Object.assign(course, {
      name,
      description,
      category_id,
      updated_at: new Date(),
    });

    await this.coursesRepository.create({ id, name, description, category_id });

    return course;
  }
}

export { UpdateCourseUseCase };
