import Image from "next/image";
import { useState, useEffect } from "react";
import CustomImage from './CustomImage';

import {
    HeartIcon,
    ChatBubbleLeftIcon,
    ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';

const PublicationCard = ({ content, authorImage }) => {
    const [formattedImageUrl, setFormattedImageurl] = useState();
    const imageUrl = authorImage?.url;
    useEffect(() => {
        formatImageUrl(imageUrl);
    }, [formattedImageUrl])

    function formatImageUrl(imageUrl) {
        let avatarUrl;
        if (imageUrl?.startsWith("ipfs://")) {
            let result = imageUrl.substring(7, imageUrl.length);
            avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
        } else {
            avatarUrl = imageUrl;
        }
        setFormattedImageurl(avatarUrl);
    }

    return (
        <div className="border-b-[1px] border-gray-500 p-4 gap-4 last-of-type:border-b-0">
            <div className="flex flex-col md:flex-row">
                <div className="basis-16">
                    {formattedImageUrl ? (
                        <div className="h-14 w-14">
                            <Image
                                width={48}
                                height={48}
                                className="rounded-full"
                                alt="Image"
                                src={formattedImageUrl}
                            />
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
                <p className="self-center">{content}</p>
            </div>
            <div className="flex flex-row gap-6 mt-6 items-center ml-20">
                <HeartIcon className="w-6 h-6 mr-6 cursor-pointer hover:scale-110 hover:text-lime-500" />
                <ChatBubbleLeftIcon className="w-6 h-6 mr-6 cursor-pointer hover:scale-110 hover:text-lime-500" />
                <ArrowsRightLeftIcon className="w-6 h-6 mr-6 cursor-pointer hover:scale-110 hover:text-lime-500" />
            </div>
        </div> 
    );
};

export default PublicationCard;