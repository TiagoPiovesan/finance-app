import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native'

interface Props {
    name: string,
    surname: string,
}

export function Profile({name, surname}: Props) {
    return (
        <View>
            <Text testID='text-title'>Perfil</Text>
            <TextInput
                testID='input-name'
                placeholder='Nome'
                autoCorrect={false}
                value={name}
            />

            <TextInput
                testID='input-surname'
                placeholder='Sobrenome'
                autoCorrect={false}
                value={surname}
            />

            <Button
                testID=''
                title='Salvar'
                onPress={() => {}}
            />
        </View>
    )
}