import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/auth/dto/user.dto';

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

  async getUser(user_id: uuidv4): Promise<string> {
    const user = await this.userRepository.findOne({ where: { user_id } });
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
    
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

}
