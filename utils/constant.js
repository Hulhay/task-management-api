const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
const emailFormat =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const msg = {
  // 200
  success: "success",

  // 401
  errEmptyAuthorization: "authorization is empty",
  errInvalidAuthorization: "invalid authorization",
  errAlreadyLogout: "you have logged out. please login",
  errInvalidToken: "invalid token",
  errExpiredToken: "expired token",

  // 404
  errTaskNotFound: "task not found",
  errEmailNotFound: "email not found",

  // 422
  errEmptyTitle: "title cannot be empty",
  errLongTitle: "max title character is 100",
  errLongDescription: "max description character is 1000",
  errDateTimeFormat: "invalid date time format (YYYY-MM-DD HH:mm:ss)",
  errInvalidPriority: "invalid priority (low, medium, high)",
  errInvalidStatus: "invalid status (todo, in-progress, completed)",
  errMuchTags: "max tags item is 50",
  errLongTag: "max tag character is 50",
  errKeywordLT3: "at leaset 3 character",
  errInvalidUUIDFormat: "invalid uuid format",
  errEmptyName: "name cannot be empty",
  errEmptyEmail: "email cannot be empty",
  errEmailFormat: "invalid email format",
  errEmptyPassword: "password cannot be empty",
  errShortPassword: "password must have a minimum of 8 characters",
  errEmailExist: "email already exists",
  errWrongPassword: "wrong password",

  // 500
  errFailedCreateTask: "failed to create new task",
  errFailedGetTasks: "failed to get tasks",
  errFailedUpdateTask: "failed to update task",
  errFailedDeleteTask: "failed to delete task",
  errFailedRegister: "failed to register",
  errfailedLogin: "failed to login",
  errfailedLogout: "failed to logout",
  errSomethingWentWrong: "something went wrong",
};

module.exports = { msg, dateTimeFormat, emailFormat };
