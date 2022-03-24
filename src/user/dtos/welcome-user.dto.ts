import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class WelcomeUserDto {
  @ApiProperty({
    name: 'organization',
    description: 'Organization of the new user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  organization: string

  @ApiProperty({
    name: 'name',
    description: 'Name of the new user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    name: 'email',
    description: 'Email of the new user',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string
}
