import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SignInDto } from 'src/dto/signin.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
 
  async signIn(signInDto: SignInDto): Promise<string> {    
    if(!signInDto.email || !signInDto.password){
      return "Favor preencher todos os campos"
    }
    let user = await this.usersRepository.findOneBy({ 
      email: signInDto.email,
      password: signInDto.password
    }).catch(err => {
      return "Ocorreu um erro inesperado"
    });

    if(user) {
      return "Logado"
    } else {
      return "Usuário ou senha inválido"
    }
  }

  async create(createUser: CreateUserDto): Promise<string> {
    let existingUser = await this.usersRepository.findOneBy({email: createUser.email})
    if(existingUser){
      return "Usuário já cadastrado"      
    }
    const user = new User();
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.password = createUser.password;
    user.email = createUser.email;
    let newUser = await this.usersRepository.save(user);
    if(newUser) {
      return "Usuário cadastrado com sucesso"
    } else {
      return "Problema ao cadastrar usuário"
    }    
  }
}