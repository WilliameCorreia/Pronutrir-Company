import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  TouchableOpacityProps,
  View
} from 'react-native';
import useTheme from '../../hooks/useTheme';
import createStyles from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rounded' | 'square' | 'pill' | 'circle';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  textStyle?: object;
  size?: ButtonSize;
  shape?: ButtonShape;
  elevated?: boolean; // Nova propriedade para controlar a elevação
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  textStyle = {},
  style = {},
  size = 'medium',
  shape = 'rounded',
  elevated = false, // Valor padrão é false
  ...rest
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  
  // Determina o estilo do botão com base na variante
  const getButtonStyle = () => {
    if (disabled) return styles.buttonDisabled;
    
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary;
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };
  
  // Determina o estilo do texto com base na variante
  const getTextStyle = () => {
    if (disabled) return styles.textDisabled;
    
    switch (variant) {
      case 'primary':
        return styles.textPrimary;
      case 'secondary':
        return styles.textSecondary;
      case 'outline':
        return styles.textOutline;
      default:
        return styles.textPrimary;
    }
  };
  
  // Determina o estilo do botão com base no tamanho
  const getButtonSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      case 'medium':
      default:
        return styles.buttonMedium;
    }
  };
  
  // Determina o estilo do texto com base no tamanho
  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      case 'medium':
      default:
        return styles.textMedium;
    }
  };
  
  // Determina o estilo do botão com base no formato
  const getButtonShapeStyle = () => {
    switch (shape) {
      case 'square':
        return styles.buttonSquare;
      case 'pill':
        return styles.buttonPill;
      case 'circle':
        return styles.buttonCircle; // Usamos um estilo definido ao invés de inline
      case 'rounded':
      default:
        return styles.buttonRounded;
    }
  };
  
  // Verifica se o botão é circular
  const isCircular = shape === 'circle';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getButtonSizeStyle(),
        getButtonShapeStyle(),
        elevated && styles.buttonElevated, // Aplicamos o estilo de elevação se elevated for true
        style
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size={size === 'small' ? 'small' : 'small'}
          color={variant === 'outline' ? theme.colors.primary : '#FFF'} 
        />
      ) : (
        <>
          {isCircular ? (
            <View style={styles.circleIconContainer}>
              {icon}
            </View>
          ) : (
            <>
              {icon && <>{icon}</>}
              {title && <Text style={[getTextStyle(), getTextSizeStyle(), textStyle]}>{title}</Text>}
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
