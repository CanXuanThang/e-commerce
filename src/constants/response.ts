export const successResponse = <T>(data: T, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (error: any, message = "Error") => {
  return {
    success: false,
    message,
    error,
  };
};

export const unauthorizedResponse = (message = "Not authenticated") => {
  return {
    success: false,
    message,
  };
};

export const notHavePermissionResponse = (
  message = "You do not have permission to access",
) => {
  return {
    success: false,
    message,
  };
};

export const conflictResponse = (message = "Conflict !") => {
  return {
    success: false,
    message,
  };
};
