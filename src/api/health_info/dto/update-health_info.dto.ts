import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthInfoDto } from './create-health_info.dto';

export class UpdateHealthInfoDto extends PartialType(CreateHealthInfoDto) {}
