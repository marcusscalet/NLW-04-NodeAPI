import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUserRepository";
import { Request, Response } from "express";
import { AppError } from "../errors/AppErrors";

class AnswerController {

    async execute(request: Request, response: Response) {

        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("Survey User dows not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };
