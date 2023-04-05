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
    selfie
  }: {
    id: string;
    nik: string;
    selfie: string;
  }) => {
    const formData = new FormData();
    formData.append('nik', {
      uri: nik,
      name: 'image.jpg',
      type: 'image/jpeg'
    });
    formData.append('selfie', {
      uri: selfie,
      name: 'image.jpg',
      type: 'image/jpeg'
    });
    return axiosInstance.post(`/upload-document/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return {
    verifyEmail,
    register,
    updateProfile,
    uploadDocument
  };
};

export default RegisterService;
