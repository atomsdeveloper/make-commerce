export type CredentialData = {
  name?: string | undefined;
  email: string;
  password: string;
};

export type GetDataAction = {
  formState: CredentialData;
  errors: string[];
  success: boolean;
};
