import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const InputField = ({ name, value, placeholder, onChange }) => (
  <input
    type="text"
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full px-2 py-2.5 border border-gray-300 rounded outline-none focus:border-primary text-sm transition"
    required
  />
);

const AddAddress = () => {
  const { address, setAddress, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Address:', address);
    navigate('/cart');
  };

  return (
    <div className="mt-8 pb-20 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl">
          Add Shipping <span className="color-primary font-medium">Address</span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField name="firstName" value={address.firstName} placeholder="First Name" onChange={handleChange} />
            <InputField name="lastName" value={address.lastName} placeholder="Last Name" onChange={handleChange} />
          </div>

          <InputField name="email" value={address.email} placeholder="Email" onChange={handleChange} />
          <InputField name="phone" value={address.phone} placeholder="Phone" onChange={handleChange} />

          <InputField name="street" value={address.street} placeholder="Street" onChange={handleChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField name="city" value={address.city} placeholder="City" onChange={handleChange} />
            <InputField name="state" value={address.state} placeholder="State" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField name="zip" value={address.zip} placeholder="Zip" onChange={handleChange} />
            <InputField name="country" value={address.country} placeholder="Country" onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="text-white bg-primary px-20 py-3 mx-auto block mt-8 cursor-pointer">
            Save Address
          </button>
        </form>
      </div>

      <img src={assets.add_address_iamge} alt="Add Address" className="mt-8 md:mt-0" />
    </div>
  );
};

export default AddAddress;
