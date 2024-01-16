import * as S from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GroupsGetAll } from '@storage/group/groupsGetAll';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Groups() {
    const [groups, setGroups] = useState<string[]>([]);
    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new')
    }

    async function fetchGroups() {
        try {
            const data = await GroupsGetAll();
            setGroups(data)

        } catch (error) {
            console.log(error)
        }
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })

    }

    useFocusEffect(
        useCallback(() => {

            fetchGroups();
        }, [])
    )

    return (
        <S.Container >
            <Header />

            <Highlight
                title='Turmas'
                subtitle='jogue com a sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
                ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
            />
            <Button title={'Criar nova turma'} onPress={handleNewGroup} />

        </S.Container>

    )
}

