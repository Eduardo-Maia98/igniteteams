import { Header } from "@components/Header";
import * as S from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string
}

type Props = {
  propss?: any
}

export function Players({ propss }: Props) {
  const route = useRoute()
  const navigation = useNavigation()
  const { group } = route.params as RouteParams;
  const inpuRef = useRef<TextInput>(null)

  const [team, setTeam] = useState('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.')
    }
    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)

      inpuRef.current?.blur();


      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar.')
      }
    }


  }
  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Nao foi possível.');
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(group, playerName);
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Pessoa', 'Não foi possíel remover esse pessoa.');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover', 'Não foi possíel remover o grupo.');
    }

  }
  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )



  }


  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])




  return (
    <S.Container >
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Acicione a galera e separe os times"
      />
      <S.Form>

        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          inputRef={inpuRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"

        />

        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal

        />

        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>


      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => { handlePlayerRemove(item.name) }}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time!" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={() => handleGroupRemove()}
      />

    </S.Container>

  )
}
