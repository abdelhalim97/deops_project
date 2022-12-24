import { TaskStatus } from "../../utils/task.model";
import { IsEnum, IsOptional, IsString } from "class-validator";
export class GetTaskDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    @IsOptional()
    @IsString()
    search?: string;
}