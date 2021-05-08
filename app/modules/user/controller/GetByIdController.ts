import { User, } from '../../../domain/dto'
import { NotFoundError, } from '../../../error'
import { GetUserByIdService, } from '../service'

export class GetUserByIdController {
  /**
   * Gets an user filtering by ID
   * @author fnavia
   * @since 1.0.0
   * @param userId User ID to filter
   * @returns An user model
   */
  public static async get(userId: string): Promise<User> {
    const user = await GetUserByIdService.get(userId)

    if (!user.Item) {
      throw new NotFoundError(`Unable to find user with id '${userId}'`)
    }

    return user.Item as User
  }
}