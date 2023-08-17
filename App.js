import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '191810767650-derebntb127c74l0fblnjel2hm0qvo76.apps.googleusercontent.com',
});

const App = () => {
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập trước đó hay chưa
    const isSignedIn = async () => {
      const isUserSignedIn = await GoogleSignin.isSignedIn();
      if (isUserSignedIn) {
        // Người dùng đã đăng nhập, tiến hành xử lý logic tại đây
        console.log('User is already signed in.');
      }
    };

    isSignedIn();
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Yêu cầu người dùng đăng nhập bằng tài khoản Google
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Lấy thông tin người dùng
      console.log('User Info:', userInfo);

      // Tiến hành xử lý logic sau khi đăng nhập thành công
      console.log('Signed in with Google!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Người dùng hủy đăng nhập
        console.log('Sign in cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Đang trong quá trình đăng nhập
        console.log('Sign in in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Google Play Services không khả dụng
        console.log('Play services not available.');
      } else {
        // Lỗi đăng nhập không khắc phục được
        console.log('A non-recoverable sign-in failure occurred.', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default App;
