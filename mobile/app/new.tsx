import { Text, TouchableOpacity, View } from 'react-native'
import Logo from '../src/assets/logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 px-8"
      style={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
      {/* <Text>New Memories</Text> */}
    </View>
  )
}
