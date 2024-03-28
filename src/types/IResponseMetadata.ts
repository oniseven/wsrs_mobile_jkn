export interface IResponseMetadata {
  metadata: {
    code: boolean | number;
    message: string;
    errCode?: number | string | null;
  },
  response?: string | Record<string, any>;
  info?: string | Record<string, any>;
}