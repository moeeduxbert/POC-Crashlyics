import React, {useEffect} from 'react';
import {View, Button, SafeAreaView} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

async function onSignIn(user) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}

export default function App() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <SafeAreaView>
      <Button
        title="Sign In and Crash"
        onPress={() => {
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          });
          throw new Error('Crash test'); // Throw an error to crash the app
        }}
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
    </SafeAreaView>
  );
}
