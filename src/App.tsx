import store from '_redux/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import Typography from 'components/Typography';
import CONFIG from 'config';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import DashboardScreen from 'screens/DashboardScreen';
import OrderScreen from 'screens/OrderScreen';
import PaymentScreen from 'screens/PaymentScreen';
import PaymentSuccess from 'screens/PaymentSuccess';
import PinScreen from 'screens/PinScreen';
import ProductScreen from 'screens/ProductScreen';
import PurchaseDetailScreen from 'screens/PurchaseDetailScreen';
import RegisterScreen from 'screens/RegisterScreen';
import ReportScreen from 'screens/ReportScreen';
import VerificationPhoneScreen from 'screens/VerificationPhoneScreen';
import VerificationScreen from 'screens/VerificationScreen';
import COLORS from 'utils/colors';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const AppWrapper = () => {
  const { isAuthenticated } = useSelector((state: any) => state.authReducer);

  const Tab = createBottomTabNavigator();

  function MyTabBar(routes: any) {
    const { state, descriptors, navigation } = routes;
    const routeName = getFocusedRouteNameFromRoute(routes) ?? '';
    if (routeName === 'Report' || routeName === 'Alert') {
      return;
    }

    return (
      <View
        style={[
          {
            backgroundColor: COLORS.white,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderWidth: 0.5,
            borderColor: COLORS.textGray
          }
        ]}
      >
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };

          return (
            <TouchableOpacity
              key={'Index' + index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ alignItems: 'center' }}
            >
              {options.tabBarIcon()}
              <Typography
                label={label}
                variant="extra-small"
                fontWeight="semi-bold"
                style={{
                  color: isFocused ? COLORS.primary : COLORS.textGray,
                  marginTop: 5
                }}
                textAlign="center"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function DashboardTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => {
              return (
                <Image
                  source={IMAGES.bottomTab.home}
                  style={{ height: 25, width: 25 }}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            tabBarLabel: 'Report',
            tabBarStyle: {
              display: 'none'
            },
            tabBarIcon: () => {
              return (
                <Image
                  source={IMAGES.bottomTab.report}
                  style={{ height: 25, width: 25 }}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Alert"
          component={OrderScreen}
          options={{
            tabBarLabel: 'Daftar Order',
            tabBarIcon: () => {
              return (
                <Image
                  source={IMAGES.bottomTab.alert}
                  style={{ height: 25, width: 25 }}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {!isAuthenticated ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Pin" component={PinScreen} />
            <Stack.Screen name="BottomTab" component={DashboardTabs} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen
              name="VerificationPhone"
              component={VerificationPhoneScreen}
            />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen
              name="PurchaseDetail"
              component={PurchaseDetailScreen}
            />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

function App() {
  useEffect(() => {
    SplashScreen.hide();
    GoogleSignin.configure({
      webClientId: CONFIG.CLIENT_ID
    });
  }, []);

  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}

export default App;
