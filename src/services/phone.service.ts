import { axiosInstance } from 'utils/axiosInstance';

const PhoneService = () => {
  const updateMobileNumber = ({ mobile }: { mobile: string }) => {
    return axiosInstance.post(
      '/members/update-mobile-number',
      JSON.stringify({
        mobile
      })
    );
  };

  const verifyMobileNumber = ({
    mobile,
    verification_otp
  }: {
    mobile: string;
    verification_otp: string;
  }) => {
    return axiosInstance.post(
      '/members/verify-mobile-number',
      JSON.stringify({
        mobile,
        verification_otp
      })
    );
  };

  return {
    updateMobileNumber,
    verifyMobileNumber
  };
};

export default PhoneService;
