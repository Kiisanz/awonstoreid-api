import appConf from "../config/app.conf.js";

/**
 * Controller for get aplication info.
 */

class AppController {
  /**
   * Gets the application status.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Returns a JSON response with application status.
   */
  static getAppStatus(req, res) {
    const status = {
      status: "running",
      uptime: process.uptime(),
      message: "Application is running smoothly.",
    };
    res.status(200).json(status);
  }

  /**
   * Performs a health check of the API.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} Returns a JSON response indicating the API health status.
   */
  static healthCheck(req, res) {
    res.status(200).json({ message: "API is healthy" });
  }
}

export default AppController;
