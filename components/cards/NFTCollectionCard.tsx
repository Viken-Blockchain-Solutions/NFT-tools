"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const NFTCollectionCard = ({ data, handleTagClick, handleEdit, handleDelete }: {data: any, handleTagClick: any, handleEdit: any, handleDelete: any}) => {
  const [copied , setCopied] = useState("");
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={data.collection.image}
            alt="collection image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{data.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{data.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={() =>{}}>
      <Image src={copied === data.prompt 
        ? '/assets/icons/tick.svg'
        : '/assets/icons/copy.svg'
        } 
        alt="asset" 
        width={12} 
        height={12}/>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{data.prompt}</p>
        <p className="font-inter text-sm blue-gradient cursor_pointer"
        onClick={() => handleTagClick && handleTagClick(data.tag)}>{data.tag}</p>
      </div>
    </div>
  );
};

export default NFTCollectionCard;