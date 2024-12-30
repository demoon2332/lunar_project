import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDirectory = join(__dirname, '../../logs');

(async () => {
    try {
        await fs.mkdir(logsDirectory, { recursive: true });
    } catch (err) {
        console.error('Error ensuring logs directory exists:', err);
    }
})();

const getLogFileName = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}_${month}_${day}.txt`;
};

// Define log levels
const levels = {
    INFO: 'INFO',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
};

/**
 * Write a log message to the log file
 * @param {string} level - The log level (INFO, ERROR, DEBUG)
 * @param {string|Error} message - The log message or error object
 * @param {string} [stacktrace] - The stack trace for errors
 */
const writeLog = async (level, message, stacktrace = '') => {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] ${level}: `;

    if (message instanceof Error) {
        logMessage += `${message.message}\nStack trace: ${message.stack}\n`;
    } else {
        logMessage += `${message}\n`;
    }

    if (stacktrace) {
        logMessage += `Additional Stacktrace: ${stacktrace}\n`;
    }

    const logFilePath = join(logsDirectory, getLogFileName());

    try {
        await fs.appendFile(logFilePath, logMessage);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
};

/**
 * Log info-level messages
 * @param {string} message - The log message
 */
const logInfo = (message) => writeLog(levels.INFO, message);

/**
 * Log error-level messages, including the stack trace
 * @param {Error|string} message - The error object or message
 * @param {string} stacktrace - The stack trace to log
 */
const logError = (message, stacktrace = '') => writeLog(levels.ERROR, message, stacktrace);

/**
 * Log debug-level messages
 * @param {string} message - The log message
 */
const logDebug = (message) => writeLog(levels.DEBUG, message);

export { logInfo, logError, logDebug };
