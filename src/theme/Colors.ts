export interface IColor {
    backgroundScreen: string;
    backgroundTabBottom: string,
    buttonBackground: string; // New property for button background
    primary: string;
    secondary: string;
    text: string;
    text_primary: string;
    text_secondary: string;
    text_tertiary: string;
    border: string;
    fill: string,
    active: string,
    disabled: string; // Nova propriedade para elementos desabilitados
    error: string; // Nova propriedade para mensagens de erro
}

export const ThemeLight: IColor = {
    // Cores de fundo
    backgroundScreen: '#F2F2F2', // Antes: #F0F5F7
    backgroundTabBottom: 'rgb(230, 239, 242)', // Antes: #E6EFF2
    buttonBackground: '#FFFFFF', // White background for buttons in light theme

    // Cores principais - baseadas nas cores fornecidas
    primary: 'rgb(0, 153, 160)', // Antes: #0099A0
    secondary: 'rgb(160, 201, 203)', // Antes: #A0C9CB

    // Cores de texto
    text: 'rgb(32, 31, 66)', // Antes: #201F42
    text_primary: 'rgb(85, 81, 79)', // Antes: #55514F
    text_secondary: 'rgb(0, 153, 160)', // Antes: #0099A0
    text_tertiary: 'rgb(158, 158, 158)', // Antes: #9E9E9E

    // Utilitários
    border: 'rgb(224, 224, 224)', // Antes: #E0E0E0
    fill: 'rgb(115, 115, 115)', // Antes: #737373

    // Status
    active: 'rgb(0, 153, 160)', // Antes: #0099A0
    disabled: 'rgb(200, 200, 200)', // Cor para elementos desabilitados no tema claro
    error: 'rgb(220, 53, 69)', // Cor vermelha para erros no tema claro
};

export const ThemeDark: IColor = {
    // Cores de fundo - inspiradas no VS Code 2019
    backgroundScreen: 'rgb(30, 30, 30)', // Antes: #1E1E1E
    backgroundTabBottom: 'rgb(37, 37, 38)', // Antes: #252526
    buttonBackground: 'rgb(45, 45, 48)', // Slightly lighter than background for buttons in dark theme

    // Cores principais
    primary: 'rgb(86, 156, 214)', // Antes: #569CD6
    secondary: 'rgb(78, 201, 176)', // Antes: #4EC9B0

    // Cores de texto
    text: 'rgb(212, 212, 212)', // Antes: #D4D4D4
    text_primary: 'rgb(204, 204, 204)', // Antes: #CCCCCC
    text_secondary: 'rgb(156, 220, 254)', // Antes: #9CDCFE
    text_tertiary: 'rgb(106, 153, 85)', // Antes: #6A9955

    // Utilitários
    border: 'rgb(68, 68, 68)', // Antes: #444444
    fill: 'rgb(187, 187, 187)', // Antes: #BBBBBB

    // Status
    active: 'rgb(206, 145, 120)', // Antes: #CE9178
    disabled: 'rgb(100, 100, 100)', // Cor para elementos desabilitados no tema escuro
    error: 'rgb(255, 99, 71)', // Cor vermelha para erros no tema escuro
};
