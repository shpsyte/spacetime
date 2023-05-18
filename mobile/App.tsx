import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import blurBg from './src/assets/bg-blur.png'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import Stripes from './src/assets/stripes.svg'
import Logo from './src/assets/logo.svg'
import { styled } from 'nativewind'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from './src/lib/api'
import * as SecureStore from 'expo-secure-store'

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/4dbb4be39e2ef7624b0b',
}

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [request, response, signinWithGitHub] = useAuthRequest(
    {
      clientId: '4dbb4be39e2ef7624b0b',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nwlspacetime',
      }),
    },
    discovery
  )

  useEffect(() => {
    // console.log(response)
    // console.log(makeRedirectUri({
    //   scheme: 'nwlspacetime',
    // }))

    if (response?.type === 'success') {
      const { code } = response.params

      api
        .post('/register', {
          code,
        })
        .then((res) => {
          const { token } = res.data
          console.log(token)
          SecureStore.setItemAsync('token', token)
        })
        .catch((err) => {
          console.log('Error', err)
        })
    }
  }, [response])

  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute left-0" />

      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signinWithGitHub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembranca
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      {/* <Text className="font-title text-5xl text-gray-50">Rocketseat</Text> */}
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
