import {Color} from './color'

export const darkTheme: Theme = {
  background: Color.Black,
  color: Color.White,
  buttonBackground: Color.White,
  buttonColor: Color.Black,
}

export const lightTheme: Theme = {
  background: Color.White,
  color: Color.Black,
  buttonBackground: Color.Black,
  buttonColor: Color.White,
}

export interface Theme {
  background: Color
  color: Color
  buttonBackground: Color
  buttonColor: Color
}

export enum ThemeMode {
  Light,
  Dark,
}
