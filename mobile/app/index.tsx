import { Text, TouchableOpacity, View } from 'react-native'

import Logo from '../src/assets/logo.svg'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/4dbb4be39e2ef7624b0b',
}

export default function App() {
  const router = useRouter()

  const [, response, signinWithGitHub] = useAuthRequest(
    {
      clientId: '4dbb4be39e2ef7624b0b',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nwlspacetime',
      }),
    },
    discovery
  )

  async function handleGitHubOauthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data
    await SecureStore.setItemAsync('token', token)
    router.push('/memories')
  }

  useEffect(() => {
    // console.log(response)
    // console.log(makeRedirectUri({
    //   scheme: 'nwlspacetime',
    // }))

    if (response?.type === 'success') {
      const { code } = response.params
      handleGitHubOauthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center  px-8 py-10">
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
    </View>
  )
}
