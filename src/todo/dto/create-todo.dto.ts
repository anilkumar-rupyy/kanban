import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateTodoDTO {
    
    @IsString()
    @IsNotEmpty()  
    title: string;
}