import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: S.ButtonIconTypeStyleProps;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
  return (
    <S.Container {...rest}  >
      <S.Icon name={icon} type={type}></S.Icon>
    </S.Container>

  )
}
