import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Logo from '../src/assets/logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'

export default function Memories() {
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>('')
  const { bottom, top } = useSafeAreaInsets()

  async function openImagPicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        quality: 1,
      })

      if (result.assets[0]) {
        // pegando a url da img
        setPreview(result.assets[0].uri)
      }
    } catch (error) {}
  }
  function handleCreateMemory() {
    console.log('create memory', {
      isPublic,
      content,
    })
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
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
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            style={{}}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{
              false: '#767577',
              true: '#372560',
            }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memoria publica
          </Text>
        </View>
        <TouchableOpacity
          onPress={openImagPicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              style={{ height: '100%', width: '100%', borderRadius: 10 }}
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" size={16} color="#fff" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar imagem
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Digite sua memoria"
          placeholderTextColor="#5656a"
          value={content}
          onChangeText={setContent}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="mt-6 items-center self-end rounded-full bg-green-500 px-5 py-3"
        onPress={() => handleCreateMemory()}
      >
        <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
      </TouchableOpacity>
      {/* <Text>New Memories</Text> */}
    </ScrollView>
  )
}
