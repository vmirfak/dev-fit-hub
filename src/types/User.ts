

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  roleDesc: string;
  name: string;
};

export type UserProfileToken = {
  message: string;
  token: string;
  user: UserProfile;
};
