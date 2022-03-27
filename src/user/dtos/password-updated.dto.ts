import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class PasswordUpdatedDto {
  @ApiProperty({
    name: 'email',
    description: 'Email of the user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string
}
