import { TaskStatus } from "../../utils/task.model";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateTaskStatusDTO {
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus
}