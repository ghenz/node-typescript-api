import { DefaultMongoDBRepository } from './defaultMongoDBRepository';
import { User } from '../models/user';
import { UserRepository, WithId } from '.';

export class UserMongoDBRepository
  extends DefaultMongoDBRepository<User>
  implements UserRepository
{
  constructor(userModel = User) {
    super(userModel);
  }

  async findOneById(id: string): Promise<WithId<User> | undefined> {
    const result = await this.findOne({ _id: id });
    if (!result) return undefined;
    return { ...result, id: result._id.toString() } as WithId<User>;
  }

  async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }
}
