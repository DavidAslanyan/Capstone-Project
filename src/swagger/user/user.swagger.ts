import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';

export const ApiUserTags = ApiTags('User');

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiBody({
      description: 'Details of user to be created',
      examples: {
        example: {
          summary: 'Valid request example',
          value: {
            firstName: 'string',
            lastName: 'string',
            password: 'yourpassword123',
            email: 'example@gmail.com',
            difficultyLevel: 'easy | medium | hard'
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
      schema: {
        example: {
          statusCode: 201,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            difficultyLevel: 'easy | medium | hard',
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'active',
          },
          error: null,
          message: 'User has been created successfully!',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. The request requires user authentication.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden. You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'No permission',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an existing user' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'The ID of the user to be update.',
      required: true,
      example: '64b15d8ed53e4507a12c1b92',
    }),
    ApiBody({
      description: 'Details of user to be updated',
      examples: {
        example: {
          summary: 'Valid request example',
          value: {
            firstName: 'string',
            lastName: 'string',
            password: 'yourpassword123',
            email: 'example@gmail.com',
            difficultyLevel: 'easy | medium | hard'
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully updated.',
      schema: {
        example: {
          statusCode: 200,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            difficultyLevel: 'easy | medium | hard',
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'active',
          },
          error: null,
          message: 'User has been updated successfully!',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. Validation errors.',
      schema: {
        example: {
          statusCode: 400,
          message: 'Bad Request',
          errors: {
            field: 'email',
            message: ['Invalid email!'],
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. The request requires user authentication.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden. You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'No permission',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'User not found.',
      schema: {
        example: {
          statusCode: 404,
          message: 'Item not found.',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiUpdateUserProgress() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user progress' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiBody({
      description: 'Progress value to update for the user',
      examples: {
        example: {
          summary: 'Valid request example',
          value: {
            progress: 50, // Example progress value
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The user progress has been successfully updated.',
      schema: {
        example: {
          statusCode: 200,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            difficultyLevel: 'easy | medium | hard',
            progress: 50, // Updated progress value
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'active',
          },
          error: null,
          message: 'User progress has been updated successfully!',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. Validation errors.',
      schema: {
        example: {
          statusCode: 400,
          message: 'Bad Request',
          errors: {
            field: 'progress',
            message: ['Progress must be a number between 0 and 100.'],
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. The request requires user authentication.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden. You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'No permission',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'User not found.',
      schema: {
        example: {
          statusCode: 404,
          message: 'User not found.',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiDeleteUserById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a user',
      description: 'Deletes a user by its ID',
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'The ID of the user to be deleted.',
      required: true,
      example: '64b15d8ed53e4507a12c1b92',
    }),
    ApiBody({
      description: 'Details of user deletion reason',
      examples: {
        example: {
          summary: 'Valid request example',
          value: {
            deletionReason: 'string',
          },
        },
      },
    }),
    ApiResponse({
      status: 204,
      description:
        'User has been successfully deleted. The endpoint does not return a body.',
    }),
    ApiResponse({
      status: 404,
      description: 'The user with the specified ID does not exist.',
      schema: {
        example: {
          summary: 'User not found',
          value: {
            statusCode: 404,
            message: 'Item not found',
            error: 'Not Found',
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description:
        'The request is not authenticated (e.g., missing or invalid JWT).',
      schema: {
        example: {
          summary: 'Unauthorized error',
          value: { statusCode: 401, message: 'Unauthorized' },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'The user is authenticated but does not have permission to delete the user.',
      schema: {
        example: {
          summary: 'Forbidden error',
          value: { statusCode: 403, message: 'Forbidden' },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiGetUserById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by ID' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'The ID of the user to get.',
      required: true,
      example: '64b15d8ed53e4507a12c1b92',
    }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully retrieved.',
      schema: {
        example: {
          statusCode: 200,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            phone: '+37499999999',
            userType: 'b2c',
            b2cProfile: {
              loyaltyPoints: 10,
              upcomingEventsCount: 1,
              followingList: 22,
              address: 'your address',
            },
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'active',
          },
          error: null,
          message: 'User has been fetched successfully!!',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'user not found.',
      schema: {
        example: {
          statusCode: 404,
          message: 'Item not found.',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}


export function ApiListUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'List all users' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      description: 'The page number for pagination. Default is 1.',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'The number of items to display per page. Default is 10.',
      example: 10,
    }),
    ApiQuery({
      name: 'orderBy',
      type: String,
      required: false,
      description: 'The field by which to sort the results.',
      example: 'id',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      description:
        'The sorting order, either "ASC" for ascending or "DESC" for descending. Default is "ASC".',
      example: 'DESC',
    }),
    ApiQuery({
      name: 'short',
      type: Boolean,
      required: false,
      description:
        'If true, returns a shorter version of the response with minimal fields.',
      example: true,
    }),
    ApiResponse({
      status: 200,
      description: 'A list of users.',
      schema: {
        example: {
          statusCode: 200,
          status: 'success',
          data: {
            user: [
              {
                id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
                firstName: 'string',
                lastName: 'string',
  
                email: 'example@gmail.com',
                phone: '+37499999999',
                userType: 'b2c',
                b2cProfile: {
                  loyaltyPoints: 10,
                  upcomingEventsCount: 1,
                  followingList: 22,
                  address: 'your address',
                },
                createdAt: '2024-08-19T12:34:56Z',
                updatedAt: '2024-08-19T12:34:56Z',
                status: 'unverified',
              },
              {
                id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
                firstName: 'string',
                lastName: 'string',
                email: 'example1@gmail.com',
                phone: '+37499999998',
                userType: 'b2c',
                b2cProfile: {
                  loyaltyPoints: 10,
                  upcomingEventsCount: 1,
                  followingList: 22,
                  address: 'your address',
                },
                createdAt: '2024-08-19T12:34:56Z',
                updatedAt: '2024-08-19T12:34:56Z',
                status: 'active',
              },
            ],
            total: 2,
          },
          error: null,
          message: 'User has been fetched successfully!',
        },
      },
    }),
    ApiResponse({
      status: 204,
      description:
        'No content. The resource was found, but there is no data to return.',
      schema: {
        example: {
          statusCode: 204,
          status: 'success',
          data: {
            user: [],
            total: 0,
          },
          error: null,
          message: 'User has been fetched successfully!',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiReviewUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Review a new user' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiBody({
      description: 'Details of user review to be created',
      examples: {
        example: {
          summary: 'Valid request example',
          value: {
            userId: 'c980c527-4e5b-4de7-843e-6ff22329f7b8',
            reviewedBy: '0b8e9dbe-b5b7-43f1-beb9-dfd3b341de08',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The user review has been successfully created.',
      schema: {
        example: {
          statusCode: 201,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            phone: '+37499999999',
            userType: 'b2c',
            b2cProfile: {
              loyaltyPoints: 10,
              upcomingEventsCount: 1,
              followingList: 22,
              address: 'your address',
            },
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'active',
          },
          error: null,
          message: 'User has been reviewed successfully!',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. Validation errors.',
      schema: {
        example: {
          statusCode: 400,
          message: 'Bad Request',
          errors: [
            {
              field: 'userId',
              message: ['Invalid ID!'],
            },
          ],
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. The request requires user authentication.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden. You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'No permission',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}

export function ApiBlockUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Block a new user' }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer token for authentication',
      required: true,
    }),
    ApiResponse({
      status: 204,
      description: 'The user has been successfully blocked.',
      schema: {
        example: {
          statusCode: 200,
          status: 'success',
          data: {
            id: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
            firstName: 'string',
            lastName: 'string',
            email: 'example@gmail.com',
            phone: '+37499999999',
            userType: 'b2c',
            createdAt: '2024-08-19T12:34:56Z',
            updatedAt: '2024-08-19T12:34:56Z',
            status: 'blocked',
          },
          error: null,
          message: 'User has been blocked successfully!',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. The request requires user authentication.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden. You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'No permission',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'User not found.',
      schema: {
        example: {
          statusCode: 404,
          message: 'Item not found.',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal server error. An unexpected error occurred on the server.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}
