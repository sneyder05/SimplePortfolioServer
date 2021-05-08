import { S3, } from 'aws-sdk'
import config from '../../../config'
import { User, } from '../../../domain/dto'
import { NotFoundError, UnableToSaveRecordError, } from '../../../error'
import { ASWUtil, } from '../../../utils'
import { GetUserByIdService, } from './GetByIdService'

const dynamoDb = ASWUtil.getDynamoDb()
const s3 = ASWUtil.getS3()

export class UpdateUserService {
  /**
   * Updates an user
   * @author fnavia
   * @since 1.0.0
   * @param data User payload
   */
  public static async update(data: User): Promise<void> {
    const user = await GetUserByIdService.get(data.userId)

    if (!user || !user.Item) {
      throw new NotFoundError(`Unable to find an user with id '${data.userId}'`)
    }

    try {
      // Save the picture into S3 bucket
      const picture = await UpdateUserService.uploadPicture(data.userId, data.image)

      // Update the record
      const params = {
        TableName: config.dynamo.tables.User,
        Key: { userId: data.userId, },
        UpdateExpression: 'set fullname = :fn, description = :desc, image = :img, twitterUserName = :tnick',
        ExpressionAttributeValues: {
            ':fn': data.fullname,
            ':desc': data.description,
            ':img': picture.Location,
            ':tnick': data.twitterUserName,
        },
      }

      await dynamoDb.update(params).promise()
    } catch (err) {
      throw new UnableToSaveRecordError()
    }
  }

  /**
   * Uploads a Base64 image to S3 bucket
   * @author fnavia
   * @since 1.0.0
   * @param fileName File ID
   * @param imageData Base64 string content
   * @returns A S3 uploaded object instance
   */
  private static async uploadPicture(fileName: string, imageData: string): Promise<S3.ManagedUpload.SendData> {
    try {
      const [ typeDesc, imageBase64, ] = imageData.split(';')
      const [ , imageContent, ] = imageBase64.split(',')
      const [ , imageExt, ] = typeDesc.split('/')

      const img: S3.PutObjectRequest = {
        Bucket: config.s3.bucketName,
        Key: `users/${fileName}.${imageExt}`,
        Body: Buffer.from(imageContent, 'base64'),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${imageExt}`,
      }

      const picture = await s3.upload(img).promise()

      return picture
    } catch (err) {
      throw new Error('Unable to save the file')
    }
  }
}