import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
 
describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
 
  const mockUser: User = { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' };
  const mockUsers: User[] = [
    { id: 1, name: 'Sreehari', email: 'sreehari@gmail.com' },
    { id: 2, name: 'Sandesh', email: 'sandesh@gmail.com' },
  ];
 
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();
 
    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });
 
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'Abhijith', email: 'abhijith@gmail.com' };
    mockRepository.create.mockReturnValue(mockUser);
    mockRepository.save.mockResolvedValue(mockUser);
 
    const result = await service.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(repo.create).toHaveBeenCalledWith(createUserDto);
    expect(repo.save).toHaveBeenCalledWith(mockUser);
  });
 
  it('should return all users', async () => {
    mockRepository.find.mockResolvedValue(mockUsers);
 
    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
    expect(repo.find).toHaveBeenCalled();
  });
 
  it('should return a user by ID', async () => {
    mockRepository.findOne.mockResolvedValue(mockUser);
 
    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
 
  it('should update a user by ID', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Godwin', email: 'godwin@gmail.com' };
    mockRepository.update.mockResolvedValue({ affected: 1 });
    mockRepository.findOne.mockResolvedValue({ ...mockUser, ...updateUserDto });
 
    const result = await service.update(1, updateUserDto);
    expect(result).toEqual({ ...mockUser, ...updateUserDto });
    expect(repo.update).toHaveBeenCalledWith(1, updateUserDto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
 
  it('should delete a user by ID', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
 
    await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
 
  it('should throw an error when deleting a non-existent user', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 0 });
 
    await expect(service.remove(999)).rejects.toThrowError('User with ID 999 not found');
    expect(repo.delete).toHaveBeenCalledWith(999);
  });
});
 