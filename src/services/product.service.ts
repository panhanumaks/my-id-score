import { axiosInstance } from 'utils/axiosInstance';

const ProductService = () => {
  const getProduct = () => {
    return axiosInstance.get('/products/index');
  };

  const getOrder = () => {
    return axiosInstance.get('/orders/index');
  };

  const postRefund = ({ id }: { id: string }) => {
    return axiosInstance.post(`/orders/refund/${id}`);
  };

  const getProductDetail = ({ id }: { id: string }) => {
    return axiosInstance.get(`/products/show/${id}`);
  };

  const getPaymentMethod = () => {
    return axiosInstance.get('/orders/select-payment-methods');
  };

  const claimVoucher = ({
    product_id,
    voucher
  }: {
    product_id: string;
    voucher: string;
  }) => {
    return axiosInstance.post(
      '/orders/claim-voucher',
      JSON.stringify({
        product_id,
        voucher
      })
    );
  };

  const placeOrder = ({
    product_id,
    voucher
  }: {
    product_id: string;
    voucher: string | number;
  }) => {
    return axiosInstance.post(
      '/orders/place-order',
      JSON.stringify({
        product_id,
        voucher
      })
    );
  };

  const updatePaymentMethod = ({
    id,
    bank_code
  }: {
    id: string;
    bank_code: string | number;
  }) => {
    return axiosInstance.post(
      '/orders/update-payment-method',
      JSON.stringify({
        id,
        bank_code
      })
    );
  };

  const sendCreditScoreToEmail = () => {
    return axiosInstance.get('/members/credit-score');
  };

  return {
    getProduct,
    getProductDetail,
    claimVoucher,
    placeOrder,
    getPaymentMethod,
    updatePaymentMethod,
    sendCreditScoreToEmail,
    getOrder,
    postRefund
  };
};

export default ProductService;
