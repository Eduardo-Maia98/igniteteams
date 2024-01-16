import { useTheme } from "styled-components/native";
import * as S from "./styles";
import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme()
  
  return (
    <S.Container {...rest}
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
    />
  )
}
