import Image from "next/image";
import Link from "next/link";

const ProfileCard = ({ id, name, bio, handle, profileImage, followers }) => {
    return (
        <Link
            href={`/profiles/${handle}`}
            className="p-4 border rounded border-gray-500 items-center flex flex-col relative"
        >
            <Image
                src={profileImage || 'https://picsum.photos/200'}
                width={200}
                height={200}
                alt="profile pic"
                className="rounded-full mb-4"
            />
            <div className="mb-3 text-center">
                <h2 className="font-bold text-2xl">{name}</h2>
                <h3>@{handle}</h3>
            </div>
            <p className='mb-8'>{bio}</p>
            <p className="absolute bottom-2">{follers} Followers</p>
        </Link>
    );
};

export default ProfileCard;