import {Color, TextColor} from './color'

export const lightTheme: Theme = {
  background: Color.White,
  color: {
    high: TextColor.BlackHighEmphasis,
    medium: TextColor.BlackMediumEmphasis,
    disabled: TextColor.BlackDisabled,
  },
}

export const darkTheme: Theme = {
  background: Color.Black,
  color: {
    high: TextColor.WhiteHighEmphasis,
    medium: TextColor.WhiteMediumEmphasis,
    disabled: TextColor.WhiteDisabled,
  },
}

export interface Theme {
  background: Color
  color: {
    high: TextColor
    medium: TextColor
    disabled: TextColor
  }
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}
