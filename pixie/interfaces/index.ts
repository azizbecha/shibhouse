// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface NewUser {
  firstname: string,
  lastname: string,
  email: string,
  username: string,
  password: string,
  confirmpassword: string
}

export interface LogUser {
  email: string,
  password: string
}

export interface NewRoom {
  id: string,
  title: string,
  description: string,
  pinnedLink: string,
  topics?: Array<{id: string, text: string}>,
  createdBy: string,
  allowChat: boolean,
  speakers: string[],
  isPublic: boolean
}

export interface PlayerProps {
  roomId: string,
  // userName: string,
  // firstname: string,
  // lastname: string,
  // avatar: string,
  // isHost: boolean,
  // roomName: string,
  // roomDescription: string,
  // pinnedLink: string,
  // topics: string[],
  // createdBy: string,
  // createdAt: string,
  // isChatAllowed: boolean
}

export interface ChatProps {
  roomId: string;
  isChatAllowed: boolean,
  pinnedLink: string,
  leave: () => void,
  muteToggle: () => void,
  role: string,
  username: string,
  creator: string
}

export interface RoomMemberProps {
  host?: any,
  onClick: () => void,
  muted?: any,
  me: boolean,
  stream?: any,
  name: string,
  highlight?: any,
  hoverIcon: JSX.Element,
  reaction?: any,
  kickIcon?: JSX.Element,
  key: any,
  id:any,
  speakerIcon?: JSX.Element,
  firstname: string,
  lastname: string,
  avatar: string,
  roomId: string
}

export interface NotificationProps {
  title: string,
  body: string,
  silent?: boolean,
  onClick?: void,
}

export interface ScheduledRoomProps {
  title: string,
  date: string,
  time: string,
  createdBy: string
}