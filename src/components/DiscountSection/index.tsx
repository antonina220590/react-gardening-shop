import styles from './DiscountSection.module.css';
import image from '../../assets/discount.png';
import FormComponent from '../ui/Form';
import { useSendSaleRequestMutation } from '../../store/api/apiSlice';
import type { SubmitHandler } from 'react-hook-form';
import ButtonBanner from '../ui/ButtonBanner';
import { toast } from 'react-toastify';
import {
  schema,
  saleFormInputs,
  type SaleFormValues,
} from '../../schema/validation';

export default function DiscountSection() {
  const [sendSaleRequest, { isLoading, isSuccess }] =
    useSendSaleRequestMutation();

  const handleSaleSubmit: SubmitHandler<SaleFormValues> = async (
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
              <FormComponent<typeof schema>
                inputs={saleFormInputs}
                onSubmit={handleSaleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess}
                validationSchema={schema}
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
