import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Logo from '../src/assets/logo.svg'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function signOut() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Logo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-300 "
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-300 ">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        <View className="space-y-4 px-8">
          <View className="flex-row items-center gap-2">
            <View className="h-px bg-gray-50" />
            <Text className="font-body text-xs text-gray-100">
              12 de abril, 2023
            </Text>
          </View>
          <View className="space-y-4">
            <View className="flex-row items-center gap-2"></View>
            <Image
              className="aspect-video w-full rounded-lg"
              alt=""
              source={{
                uri: 'http://localhost:3333/uploads/f9a501df-412a-4fc9-abbc-36cf2296b2a4.png',
              }}
            />
            <Text className="font-body text-base leading-relaxed text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              fugit facere aliquam ipsum molestiae, nisi, accusamus cupiditate,
              minima eaque quaerat deleniti itaque eius harum aspernatur?
              Aperiam cumque sequi ipsum cupiditate!
            </Text>
          </View>
          <Link href="/memories/id" asChild>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Text className="font-body text-sm text-gray-200">Ler mais</Text>
              <Icon name="arrow-right" size={16} color="#9e9ea0" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}
