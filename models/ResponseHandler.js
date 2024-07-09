
class ResponseHandler {
    static success(res, data = {}, message = 'Success', statusCode = 200) {
      return res.status(statusCode).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static created(res, data = {}, message = 'Resource created successfully', statusCode = 201) {
      return res.status(statusCode).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static badRequest(res, message = 'Bad Request', statusCode = 400) {
      return res.status(statusCode).json({
        status: 'fail',
        message,
      });
    }
  
    static unauthorized(res, message = 'Unauthorized', statusCode = 401) {
      return res.status(statusCode).json({
        status: 'fail',
        message,
      });
    }
  
    static forbidden(res, message = 'Forbidden', statusCode = 403) {
      return res.status(statusCode).json({
        status: 'fail',
        message,
      });
    }
  
    static notFound(res, message = 'Not Found', statusCode = 404) {
      return res.status(statusCode).json({
        status: 'fail',
        message,
      });
    }
  
    static conflict(res, message = 'Conflict', statusCode = 409) {
      return res.status(statusCode).json({
        status: 'fail',
        message,
      });
    }
  
    static serverError(res, error = {}, message = 'Internal Server Error', statusCode = 500) {
      return res.status(statusCode).json({
        status: 'error',
        message,
        error: error.message || error,
      });
    }
  }
  
  module.exports = ResponseHandler;
  