import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HouseState, Room, Switchboard, Switch, HouseType, BoardType } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState: HouseState = {
  selectedType: null,
  rooms: [],
  currentRoom: null,
  userId: null
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setHouseType: (state, action: PayloadAction<HouseType>) => {
      state.selectedType = action.payload;
      state.rooms = [];
      state.currentRoom = null;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      if (!state.rooms.some(room => room.name === action.payload.name)) {
        state.rooms.push({
          ...action.payload,
          id: uuidv4()
        });
        if (!state.currentRoom && state.rooms.length === 1) {
          state.currentRoom = action.payload.name;
        }
      }
    },
    setCurrentRoom: (state, action: PayloadAction<string>) => {
      state.currentRoom = action.payload;
    },
    addSwitchboard: (state, action: PayloadAction<{ 
      roomName: string; 
      switchboard: Switchboard;
      isAttached?: boolean;
    }>) => {
      const room = state.rooms.find(r => r.name === action.payload.roomName);
      if (room) {
        const newSwitchboard = {
          ...action.payload.switchboard,
          id: action.payload.isAttached 
            ? `attached-${(room.attachedRooms.reduce((count, r) => count + r.switchboards.length, 0) + 1)}`
            : (room.switchboards.length + 1).toString()
        };

        if (action.payload.isAttached) {
          if (!room.attachedRooms.length) {
            room.attachedRooms.push({
              id: uuidv4(),
              name: 'Attached Room',
              type: 'attached',
              switchboards: [newSwitchboard],
              attachedRooms: []
            });
          } else {
            room.attachedRooms[0].switchboards.push(newSwitchboard);
          }
        } else {
          room.switchboards.push(newSwitchboard);
        }
      }
    },
    removeSwitchboard: (state, action: PayloadAction<{ 
      roomName: string; 
      switchboardId: string;
      isAttached?: boolean;
    }>) => {
      const room = state.rooms.find(r => r.name === action.payload.roomName);
      if (room) {
        if (action.payload.isAttached && room.attachedRooms.length) {
          const attachedRoom = room.attachedRooms[0];
          attachedRoom.switchboards = attachedRoom.switchboards.filter(b => b.id !== action.payload.switchboardId);
          // Reassign IDs to maintain sequence
          attachedRoom.switchboards = attachedRoom.switchboards.map((board, index) => ({
            ...board,
            id: `attached-${index + 1}`
          }));
        } else {
          room.switchboards = room.switchboards.filter(b => b.id !== action.payload.switchboardId);
          // Reassign IDs to maintain sequence
          room.switchboards = room.switchboards.map((board, index) => ({
            ...board,
            id: (index + 1).toString()
          }));
        }
      }
    },
    updateBoardType: (state, action: PayloadAction<{ 
      roomName: string; 
      boardId: string; 
      boardType: BoardType;
      isAttached?: boolean;
    }>) => {
      const room = state.rooms.find(r => r.name === action.payload.roomName);
      if (room) {
        if (action.payload.isAttached && room.attachedRooms.length) {
          const attachedRoom = room.attachedRooms[0];
          const board = attachedRoom.switchboards.find(b => b.id === action.payload.boardId);
          if (board) {
            board.boardType = action.payload.boardType;
          }
        } else {
          const board = room.switchboards.find(b => b.id === action.payload.boardId);
          if (board) {
            board.boardType = action.payload.boardType;
          }
        }
      }
    },
    addSwitch: (state, action: PayloadAction<{ 
      roomName: string; 
      switchboardId: string; 
      switch: Switch;
      isAttached?: boolean;
    }>) => {
      const room = state.rooms.find(r => r.name === action.payload.roomName);
      if (room) {
        const getBoard = () => {
          if (action.payload.isAttached && room.attachedRooms.length) {
            return room.attachedRooms[0].switchboards.find(s => s.id === action.payload.switchboardId);
          }
          return room.switchboards.find(s => s.id === action.payload.switchboardId);
        };

        const switchboard = getBoard();
        if (switchboard && switchboard.switches.length < 8) {
          const nextId = (switchboard.switches.length + 1).toString();
          switchboard.switches.push({
            ...action.payload.switch,
            id: nextId
          });
        }
      }
    },
    removeSwitch: (state, action: PayloadAction<{
      roomName: string;
      switchboardId: string;
      switchId: string;
      isAttached?: boolean;
    }>) => {
      const room = state.rooms.find(r => r.name === action.payload.roomName);
      if (room) {
        const getBoard = () => {
          if (action.payload.isAttached && room.attachedRooms.length) {
            return room.attachedRooms[0].switchboards.find(s => s.id === action.payload.switchboardId);
          }
          return room.switchboards.find(s => s.id === action.payload.switchboardId);
        };

        const switchboard = getBoard();
        if (switchboard) {
          switchboard.switches = switchboard.switches.filter(s => s.id !== action.payload.switchId);
          // Reassign IDs to maintain sequence
          switchboard.switches = switchboard.switches.map((switch_, index) => ({
            ...switch_,
            id: (index + 1).toString()
          }));
        }
      }
    },
    updateSwitchFeatures: (state, action: PayloadAction<{
      roomName: string;
      switchboardId: string;
      switchId: string;
      features: { rocker?: boolean };
      isAttached?: boolean;
    }>) => {
      const { roomName, switchboardId, switchId, features, isAttached } = action.payload;
      const room = state.rooms.find(r => r.name === roomName);
      if (room) {
        const getBoard = () => {
          if (isAttached && room.attachedRooms.length) {
            return room.attachedRooms[0].switchboards.find(s => s.id === switchboardId);
          }
          return room.switchboards.find(s => s.id === switchboardId);
        };

        const switchboard = getBoard();
        if (switchboard) {
          const switch_ = switchboard.switches.find(s => s.id === switchId);
          if (switch_) {
            switch_.features = { ...switch_.features, ...features };
          }
        }
      }
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    }
  },
});

export const {
  setHouseType,
  addRoom,
  setCurrentRoom,
  addSwitchboard,
  removeSwitchboard,
  updateBoardType,
  addSwitch,
  removeSwitch,
  updateSwitchFeatures,
  setUserId
} = houseSlice.actions;

export default houseSlice.reducer;