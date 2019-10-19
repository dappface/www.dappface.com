import {Color} from './color'

export const lightTheme: Theme = {
  background: Color.White,
  color: Color.Black,
  copyright: {
    color: Color.Gray500,
  },
}

export const darkTheme: Theme = {
  background: Color.Black,
  color: Color.White,
  copyright: {
    color: Color.Gray300,
  },
}

export interface Theme {
  background: Color
  color: Color
  copyright: {
    color: Color
  }
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}
