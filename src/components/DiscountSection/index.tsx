import styles from './DiscountSection.module.css';
import image from '../../assets/discount.png';
import FormComponent, { type FormInput } from '../FormComponent';
import { useSendSaleRequestMutation } from '../../store/api/apiSlice';
import type { SubmitHandler } from 'react-hook-form';
import ButtonBanner from '../ui/ButtonBanner';
import { toast } from 'react-toastify';

type SaleFormInputs = {
  name: string;
  phone: string;
  email: string;
};

const saleFormInputs: FormInput<SaleFormInputs>[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    validation: { required: 'Name is required' },
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone number',
    validation: { required: 'Phone is required' },
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: { required: 'Email is required' },
  },
];

export default function DiscountSection() {
  const [sendSaleRequest, { isLoading, isSuccess }] =
    useSendSaleRequestMutation();

  const handleSaleSubmit: SubmitHandler<SaleFormInputs> = async (
    data,
    event
  ) => {
    try {
      await sendSaleRequest(data).unwrap();
      if (event?.target && typeof event.target.reset === 'function') {
        event.target.reset();
      }
    } catch (error) {
      console.error('Failed to send sale request:', error);
      toast.error('Failed to send sale request. Please try again.');
    }
  };

  return (
    <section>
      <div className="container">
        <div className={styles.discount}>
          <h3 className={styles.discount_title}>5% off on the first order</h3>
          <div className={styles.discount_content}>
            <img
              className={styles.discount_image}
              src={image}
              alt="discount section image"
            ></img>
            <div className={styles.discount_form}>
              <FormComponent<SaleFormInputs>
                inputs={saleFormInputs}
                onSubmit={handleSaleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess}
                renderButton={({ isLoading, isSuccess }) => (
                  <ButtonBanner
                    text="Get a discount"
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    successText="Request Submitted"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
