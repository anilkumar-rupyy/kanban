import { IsNumber, IsString } from "class-validator";

export class GetTodoDTO {

    @IsNumber()
    id: number;

    @IsString()
    title: string;

    completed: boolean;
}