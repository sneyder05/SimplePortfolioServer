import { GenericObject, } from '../types'
import { pick as lodashPick, } from 'lodash/'

export class Utilities {
  /**
   * Creates an object keeping a specific set of keys
   * @author fnavia
   * @since 1.0.0
   * @param from Object to extrac data
   * @param keep Keys to keep
   * @returns A new object composed by the new keys
   */
  public static pick(from: GenericObject, keep: string | string[]): GenericObject {
    return lodashPick(from, keep)
  }
}