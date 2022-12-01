import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = this.usersService.createUser(user);

    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get()
  async fetchAllUsers(@Res() response) {
    const users = await this.usersService.getUsers();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:id')
  async findUserById(@Res() response, @Param('id') id) {
    const user = await this.usersService.getUserById(id);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Put('/:id')
  async updateUser(@Res() response, @Param('id') id, @Body() user: User) {
    const updatedUser = await this.usersService.updateUser(id, user);
    return response.status(HttpStatus.OK).json({
      updatedUser,
    });
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') id) {
    const deletedUser = await this.usersService.deleteUser(id);
    return response.status(HttpStatus.OK).json({
      deletedUser,
    });
  }
}
