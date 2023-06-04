'use client'
import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";

interface AddressFormProps {
  setCollectionAddress: React.Dispatch<React.SetStateAction<any>>;
  submitting: boolean;
}

const AddressForm: React.FC<AddressFormProps> = (data : AddressFormProps) => {
  const collectionAddressRef = useRef<HTMLInputElement>(null);


  const { setCollectionAddress, submitting } = data;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newAddress = collectionAddressRef.current!.value;
    setCollectionAddress({address: newAddress }); 
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">

      {/** Form */} 
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-bold text-base text-grey-700">Your NFT Collection address</span>
          <input
            ref={collectionAddressRef}
            type="text"
            placeholder="Enter your collection address"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-md"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddressForm;
