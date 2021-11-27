import React, {useEffect, useState} from "react";
import "../styles/stripe.less";
import {Select} from "antd";
import MaskedInput from 'react-text-mask';
import {useUser} from "../context/user-context";

const Field = ({
                   label,
                   id,
                   type,
                   placeholder,
                   required,
                   autoComplete,
                   value,
                   onChange,
               }) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        {
            type === 'phone' ?
                <MaskedInput
                    mask={['+', '2', '3', '7', ' ',  /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                    placeholder={placeholder}
                    guide={false}
                    id={id}
                    onChange={onChange}
                /> :
                <input
                    className="FormRowInput"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                />
        }
    </div>
);

const SubmitButton = ({processing, error, children, disabled}) => (
    <button
        className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? 'Processing...' : children}
    </button>
);

const ErrorMessage = ({children}) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({onClick}) => (
    <button type="button" className="ResetButton" onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#FFF"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);

export function MobileMoneyCheckoutForm() {
    const {user} = useUser();
    const [error, setError] = useState(null);
    const [provider, setProvider] = useState('momo');
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: user?.email,
        phone: '',
        name: user?.displayName,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(billingDetails, provider);
        // setProcessing(true);
        const phoneNumber = billingDetails.phone.split(' ').join('').slice(4);
        console.log(phoneNumber);
    };

    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: '',
            phone: '',
            name: '',
        });
    };

    function operatorSelect(val) {
        setProvider(val);
    }

    return paymentMethod ? (
        <div className="Result">
            <div className="ResultTitle text-theme-primary" role="alert">
                Payment successful
            </div>
            <div className="ResultMessage">
                <p>Thanks for purchase, you'll be notified once the book is added to your library.</p>
                <button className="btn mt-4">Back to store</button>
            </div>
            <ResetButton onClick={reset} />
        </div>
    ) : (
        <form className="Form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <Select defaultValue="momo" size="large" style={{ border: 'none', width: '100%'}} onChange={operatorSelect}>
                    <Select.Option value="momo">
                        <img src="https://ik.imagekit.io/thinkinary/mobile-money.jpg" style={{height: '20px', display: 'inline-block', marginRight: '10px'}} alt=""/>&nbsp;
                        MTN Mobile Money
                    </Select.Option>
                    <Select.Option value="om">
                        <img src="https://ik.imagekit.io/thinkinary/Orange_Money.jpg" style={{height: '20px', display: 'inline-block', marginRight: '10px'}} alt=""/>&nbsp;
                        Orange Money
                    </Select.Option>
                </Select>
            </fieldset>

            <fieldset className="FormGroup">
                <Field
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    value={billingDetails.name}
                    onChange={(e) => {
                        setBillingDetails({...billingDetails, name: e.target.value});
                    }}
                />
                <Field
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    required
                    autoComplete="email"
                    value={billingDetails.email}
                    onChange={(e) => {
                        setBillingDetails({...billingDetails, email: e.target.value});
                    }}
                />
                <Field
                    label="Phone"
                    id="phone"
                    type="phone"
                    placeholder="+237 000 00 0000"
                    required
                    autoComplete="tel"
                    value={billingDetails.phone}
                    onChange={(e) => {
                        setBillingDetails({...billingDetails, phone: e.target.value});
                    }}
                />
            </fieldset>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <SubmitButton processing={processing} error={error} disabled={false}>
                Pay
            </SubmitButton>
        </form>
    );
};

