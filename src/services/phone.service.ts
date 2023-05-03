import { axiosInstance } from 'utils/axiosInstance';

const PhoneService = () => {
  const updateMobileNumber = ({ mobile }: { mobile: string }) => {
    let _mobile;
    if (mobile !== '' && mobile[0] !== '0') {
      _mobile = '0'.concat(mobile);
    } else {
      _mobile = mobile;
    }
    return axiosInstance.post(
      '/members/update-mobile-number',
      JSON.stringify({
        mobile: _mobile
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
    let _mobile;
    if (mobile !== '' && mobile[0] !== '0') {
      _mobile = '0'.concat(mobile);
    } else {
      _mobile = mobile;
    }
    return axiosInstance.post(
      '/members/verify-mobile-number',
      JSON.stringify({
        mobile: _mobile,
        verification_otp
      }),
      {
        headers: {
          Authorization:
            'Basic eG5kX2RldmVsb3BtZW50X2Z2djJCZmNwWkh4cmYyNW9lNk53SGVvOVVHYzdQNmZHQlFzQjVDNURHSmd3QjMwaTRzRWp2cGlUMmtLTjE6'
        }
      }
    );
  };

  return {
    updateMobileNumber,
    verifyMobileNumber
  };
};

export default PhoneService;
