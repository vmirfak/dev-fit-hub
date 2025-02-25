

export type UserProfile = {
  username: string;
  email: string;
  roleDesc: string;
  name: string;
};

export type UserProfileToken = {
  message: string;
  token: string;
  user: UserProfile;
};
