import {Color} from './color'

export const darkTheme: Theme = {
  background: Color.Black,
  color: Color.White,
}

export const lightTheme: Theme = {
  background: Color.White,
  color: Color.Black,
}

export interface Theme {
  background: Color
  color: Color
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}
