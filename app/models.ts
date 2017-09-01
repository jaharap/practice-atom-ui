/**
 * Created by myuser on 2/19/17.
 */

export class AnswerModel{
    answerText: string;
    answerValue: number;
}

export class QuestionModel{
    questionText: string;
    answers: AnswerModel[];
}

export class LoginModel{
    username: string;
    password: string;
}

export class User{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
    active: boolean;
}
