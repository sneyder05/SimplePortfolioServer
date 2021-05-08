import { User, } from '../../../domain/dto'
import { UpdateUserService, } from '../service'

export class UpdateUserController {
  /**
   * Updates an user
   * @author fnavia
   * @since 1.0.0
   * @param data User payload
   */
  public static async update(data: User): Promise<void> {
    await UpdateUserService.update(data)
  }
}