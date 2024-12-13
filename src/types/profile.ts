export interface UserProfile {
  userId: string;
  location: string;
  towerName: string;
  flatNumber: string;
  floor: string;
  isProfileComplete: boolean;
}

export interface ProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}