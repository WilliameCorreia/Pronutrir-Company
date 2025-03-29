import React, { createContext, useState } from 'react';
import { ITypography, typography } from '../theme/typography';
import { IColor, ThemeDark, ThemeLight } from '../theme/Colors';

type ITheme = "ThemeLight" | "ThemeDark";
export interface ThemeContextData {
  colors: IColor;
  typography: ITypography;
  ThemeSelected: ITheme;
  toggleSwitch: () => void;
}

type Props = {
  children: React.ReactNode
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
  const [isLightTheme, setIsLightTheme] = useState<ITheme>("ThemeLight");
  //const isLightTheme = false; // this is temporary, we will get back to it later

  const theme = {
    colors: isLightTheme === 'ThemeLight' ? ThemeLight : ThemeDark,
    typography: typography,
    ThemeSelected: isLightTheme,
    toggleSwitch: () => setIsLightTheme(isLightTheme === "ThemeDark" ? "ThemeLight" : "ThemeDark")
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
