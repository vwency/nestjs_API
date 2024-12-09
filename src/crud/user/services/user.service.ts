import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { UserIdDto } from '../dto/user_id.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async getAll(){
      return await this.userRepository.find();
  }

  async getUser(userDto: UserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { ...userDto } });
    if (!user) throw new NotFoundException("User not found");
    return JSON.stringify(user);
  }
  
  async validateUser(userDto: UserDto): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { username: userDto.username } })); 
  }

  async createUser(userDto: UserDto): Promise<any> {
    if (await this.validateUser(userDto)) {
      throw new BadRequestException("User already exists");
    }
    
    return this.userRepository.save(this.userRepository.create(userDto));
  }

}
