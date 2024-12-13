export type HouseType = '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Custom' | null;

export type BoardType = 'sensor' | 'open' | 'discrete' | 'none';

export interface Switch {
  id: string;
  type: string;
  features: {
    rocker: boolean;
  };
}

export interface Switchboard {
  id: string;
  material: 'glass' | 'wood' | 'plastic';
  boardType?: BoardType;
  switches: Switch[];
}

export interface Room {
  id: string;
  name: string;
  type: 'default' | 'custom' | 'attached';
  switchboards: Switchboard[];
  attachedRooms: Room[];
}

export interface HouseState {
  selectedType: HouseType;
  rooms: Room[];
  currentRoom: string | null;
  userId: string | null;
}

export interface TempUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface AuthState {
  user: TempUser | null;
  loading: boolean;
  error: string | null;
}