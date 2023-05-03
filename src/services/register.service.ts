/* eslint-disable eslint-comments/disable-enable-pair */
import { axiosInstance } from 'utils/axiosInstance';

const RegisterService = () => {
  const register = ({ email }: { email: string }) => {
    return axiosInstance.post(
      '/register',
      JSON.stringify({
        email
      })
    );
  };

  const verifyEmail = ({
    email,
    verificationOtp
  }: {
    email: string;
    verificationOtp: string;
  }) => {
    return axiosInstance.post(
      '/verify-email',
      JSON.stringify({
        email,
        verification_otp: verificationOtp
      })
    );
  };

  const updateProfile = ({
    id,
    name,
    nik,
    date_of_birth,
    password,
    password_confirmation,
    pin,
    pin_confirmation,
    term_and_condition,
    payment_condition
  }: {
    id: string;
    name: string;
    date_of_birth: Date;
    nik: string;
    password: string;
    password_confirmation: string;
    pin: string;
    pin_confirmation: string;
    term_and_condition: boolean;
    payment_condition: boolean;
  }) => {
    return axiosInstance.post(
      `/update-profile/${id}`,
      JSON.stringify({
        name,
        nik,
        date_of_birth,
        password,
        password_confirmation,
        pin,
        pin_confirmation,
        term_and_condition,
        payment_condition
      })
    );
  };

  const uploadDocument = ({
    id,
    nik,
    selfie,
    type
  }: {
    id: string;
    nik: string;
    selfie: string;
    type: 'nik' | 'selfie';
  }) => {
    const formData = new FormData();
    if (type === 'nik' && nik !== '') {
      formData.append('nik', {
        uri: nik,
        name: 'nik' + new Date().getTime() + '.jpg',
        type: 'image/jpeg'
      });
    } else {
      formData.append('nik', '');
    }
    if (selfie !== '') {
      formData.append('selfie', {
        uri: selfie,
        name: 'selfie' + new Date().getTime() + '.jpg',
        type: 'image/jpeg'
      });
    } else {
      formData.append('selfie', '');
    }

    return axiosInstance.post(
      `/upload-document-${type === 'nik' ? 'nik' : 'selfie'}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  };

  const resendEmailVerification = ({ email }: { email: string }) => {
    return axiosInstance.post(
      '/resend-email-verification-otp',
      JSON.stringify({
        email
      })
    );
  };

  return {
    verifyEmail,
    register,
    updateProfile,
    uploadDocument,
    resendEmailVerification
  };
};

export default RegisterService;
