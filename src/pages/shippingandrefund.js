import React from 'react';
import Bottom from './bottom';

const ShippingAndRefundPolicy = () => {
  return (
    <div>
        
      <center>

        <h1 className='shipping_page-h1-01'>Shipping and Refund Policy</h1>


        <div className='shipping_main-sub-cnt-02'>
            <h2>Shipping Policy</h2>
            <p>
                At Stawro, we strive to offer a seamless shipping experience for our customers. Below is a summary of our shipping process:
            </p>

            <h3>1. Shipping Methods</h3>
            <p>
                We offer a variety of shipping methods to meet your needs. The available options will be displayed at checkout, and you can select the method that suits you best.
            </p>
            <ul>
            <li><strong>Standard Shipping:</strong> Delivered within 5-7 business days.</li>
            <li><strong>Expedited Shipping:</strong> Delivered within 2-3 business days.</li>
            <li><strong>Overnight Shipping:</strong> Delivered the next business day (only available on select items).</li>
            </ul>

            <h3>2. Shipping Costs</h3>
            <p>
            Shipping costs are calculated based on the shipping method selected and the delivery address. The final shipping cost will be displayed at checkout before you complete your purchase.
            </p>

            <h3>3. International Shipping</h3>
            <p>
            We currently offer international shipping to select countries. Please note that international orders may be subject to additional customs duties and taxes, which are the responsibility of the customer.
            </p>

            <h3>4. Order Processing Time</h3>
            <p>
            Orders are processed within 1-2 business days of receipt, excluding holidays. You will receive an email with tracking information once your order has been shipped.
            </p>

            <h3>5. Address Accuracy</h3>
            <p>
            Please ensure that the shipping address provided is accurate. Stawro is not responsible for delays or non-delivery caused by incorrect address information.
            </p>

            <h2>Refund and Return Policy</h2>
            <p>
            We understand that sometimes things don't work out. If you are not satisfied with your purchase, we offer a clear and simple refund and return process. Please review the terms below:
            </p>

            <h3>1. Refund Eligibility</h3>
            <p>
            To be eligible for a refund, your item must meet the following criteria:
            </p>
            <ul>
            <li>The item must be unused and in the same condition that you received it.</li>
            <li>The item must be in the original packaging.</li>
            <li>Refund requests must be made within 30 days of receiving your item.</li>
            </ul>

            <h3>2. How to Request a Refund</h3>
            <p>
            If you wish to request a refund, please contact us at <strong>[Insert Email Address]</strong> with the following details:
            </p>
            <ul>
            <li>Order number</li>
            <li>Item(s) you wish to return</li>
            <li>Reason for the return</li>
            </ul>
            <p>
            Once we receive your request, we will provide instructions on how to return the item and issue a refund.
            </p>

            <h3>3. Non-Refundable Items</h3>
            <p>
            The following items are not eligible for refunds:
            </p>
            <ul>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Any item not in its original condition, damaged, or missing parts for reasons not due to our error</li>
            </ul>

            <h3>4. Refund Process</h3>
            <p>
            Once your return is received and inspected, we will notify you via email. If approved, your refund will be processed to your original method of payment, and a credit will automatically be applied within a certain number of days, depending on your card issuer's policies.
            </p>

            <h3>5. Exchanges</h3>
            <p>
            If you need to exchange an item for the same item or a different size, please contact us at <strong>[Insert Email Address]</strong>. We will guide you through the exchange process.
            </p>

            <h3>6. Damaged or Defective Items</h3>
            <p>
            If you received a damaged or defective item, please contact us within 7 days of receiving your order. We will assist you with a refund, exchange, or replacement, depending on your preference.
            </p>

            <h2>Contact Us</h2>
            <p>
            If you have any questions about our shipping or refund policies, please reach out to us at:
            </p>
            <ul>
                <li>Email: <strong>stawropuzzle@gmail.com</strong></li>
                <li>Address: <strong>Chitradurga, Karnataka, India</strong></li>
            </ul>
        </div>
      </center>
      <div style={{height : "150px"}}></div>
      <br/>
      <Bottom />
    </div>
  );
};

export default ShippingAndRefundPolicy;
