import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { Slot, SplashScreen, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isAuthenticate, setIsAuthenticate] = useState<null | boolean>(null)

  const router = useRouter()
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    async function checkIfUserIsAuthenticated() {
      const token = await SecureStore.getItemAsync('token')
      setIsAuthenticate(!!token)
      // if (token) {
      //   setIsAuthenticate(true)
      //   router.push('/memories')
      // } else {
      //   setIsAuthenticate(false)
      //   router.push('/login')
      // }
    }

    checkIfUserIsAuthenticated()
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900 "
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StyledStripes className="absolute left-0" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        {/* // redirect vai mandar para proxima rota se for true */}
        <Stack.Screen name="index" redirect={isAuthenticate} />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
