export type UserProfile = {
  username: string;
  email: string;
  token: string;
  roleDesc: string;
  name: string;
};

export type UserProfileToken = {
  message: string;
  user: UserProfile;
};
