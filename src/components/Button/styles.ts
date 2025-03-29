import { StyleSheet, Platform } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';


const createStyles = (theme: ThemeContextData) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  
  // Variantes
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled || '#cccccc',
  },
  
  // Tamanhos
  buttonSmall: {
    paddingVertical: 6,
    minHeight: 32,
  },
  buttonMedium: {
    paddingVertical: 10,
    minHeight: 44,
  },
  buttonLarge: {
    paddingVertical: 14,
    minHeight: 56,
  },
  
  // Formatos
  buttonRounded: {
    borderRadius: 8,
  },
  buttonSquare: {
    borderRadius: 0,
  },
  buttonPill: {
    borderRadius: 50,
  },
  buttonCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  
  // Elevação
  buttonElevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
      },
    }),
  },

  // Estilos de texto para variantes
  textPrimary: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textSecondary: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textOutline: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  textDisabled: {
    color: '#666666',
  },
  
  // Estilos de texto para tamanhos
  textSmall: {
    fontSize: 12,
  },
  textMedium: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 16,
  },

  circleIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default createStyles;
