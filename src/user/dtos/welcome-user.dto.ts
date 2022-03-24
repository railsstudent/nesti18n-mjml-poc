import { IsNotEmpty, IsString } from 'class-validator'

export class WelcomeUserDto {
  @IsNotEmpty()
  @IsString()
  organization: string

  @IsNotEmpty()
  @IsString()
  name: string
}
