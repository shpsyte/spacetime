import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Logo from '../src/assets/logo.svg'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'

type memoryType = {
  coverUrl: string
  excerpt: string
  id: string
}
export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<memoryType[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  useEffect(() => {
    async function getMemories() {
      const response = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync('token')}`,
        },
      })
      setMemories(response.data)
    }
    getMemories()
  }, [])

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
        {memories.map((memory) => {
          return (
            <View className="space-y-4 " key={memory.id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  asdfasdfasdf
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <View className="flex-row items-center gap-2"></View>
                <Image
                  className="aspect-video w-full rounded-lg"
                  alt=""
                  source={{
                    uri: memory.coverUrl,
                  }}
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
              </View>
              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2 px-8">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
