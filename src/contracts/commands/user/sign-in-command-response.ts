export interface SignInCommandResponse {
  data: { user: UserSummaryContract; token: string };
}

interface UserSummaryContract {
  userId: string;
  email: string;
}
