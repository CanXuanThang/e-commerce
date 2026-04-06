export const successResponse = <T>(data: T, message = "Success") => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const errorResponse = (error: any, message = "Error") => {
  return {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  };
};

export const unauthorizedResponse = (message = "Not authenticated") => {
  return {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
};

export const notHavePermissionResponse = (
  message = "You do not have permission to access",
) => {
  return {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
};
