import { config } from './index';

const databases = config.nConfig.get('databases');
const serverName: string = config.nConfig.get('server:name');
const serverHost: string = config.nConfig.get('server:host');
const serverBaseUrl: string = config.nConfig.get('server:url');
const serverPort: number = config.nConfig.get('server:port');
const defaultTimeZone: string = config.nConfig.get('server:defaultTimeZone');

const ACCESS_SECRET_KEY: string = config.nConfig.get('JWT:ACCESS_SECRET_KEY');
const REFRESH_SECRET_KEY: string = config.nConfig.get('JWT:REFRESH_SECRET_KEY');
const ACCESS_TOKEN_EXPIRY: string = config.nConfig.get('JWT:ACCESS_TOKEN_EXPIRY');
const FORGOT_TOKEN_EXPIRY: string = config.nConfig.get('JWT:FORGOT_TOKEN_EXPIRY');
const REFRESH_TOKEN_EXPIRY: string = config.nConfig.get('JWT:REFRESH_TOKEN_EXPIRY');

const FROM_EMAIL: string = config.nConfig.get('EMAIL:FROM');
const EMAIL_HOST: string = config.nConfig.get('EMAIL:OPTIONS:host');
const EMAIL_PORT: string = config.nConfig.get('EMAIL:OPTIONS:port');
const USER: string = config.nConfig.get('EMAIL:OPTIONS:auth:user');
const PASSWORD: string = config.nConfig.get('EMAIL:OPTIONS:auth:pass');
const PAGE_URL: string = config.nConfig.get('PAGE_URL');

const env: string = config.nConfig.get('env');

export const CONSTANT_CONFIG = {
  SERVER: {
    NAME: serverName,
    HOST: serverHost,
    URL: serverBaseUrl,
    PORT: serverPort,
    DEFAULT_TIME_ZONE: defaultTimeZone
  },
  /**
   * Default user agent used in API calls made from this app
   */
  USER_AGENT: `${serverName}`,
  ENV: env,
  DATABASES: {
    MAIN: databases.main,
    ANALYTICS: databases.analytics
  },
  PAGE_URL: PAGE_URL,
  JWT: {
    ACCESS_SECRET_KEY: ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: REFRESH_SECRET_KEY,
    ACCESS_TOKEN_EXPIRY: ACCESS_TOKEN_EXPIRY,
    FORGOT_TOKEN_EXPIRY: FORGOT_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: REFRESH_TOKEN_EXPIRY
  },
  EMAIL: {
    FROM: FROM_EMAIL,
    OPTIONS: {
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: USER,
        pass: PASSWORD
      }
    }
  }
};
