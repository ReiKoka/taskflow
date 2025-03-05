import { HiUser } from "react-icons/hi2";
import { isPicture } from "../../utils/helpers";

type AvatarProps = {
  img: string | undefined;
};

function Avatar({ img }: AvatarProps) {
  console.log(img);
  return (
    <div className="border-border flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
      {img && isPicture(img) ? (
        <img src={img} alt="user-profile-img" className="" />
      ) : (
        <HiUser className="fill-border" size={30} />
      )}
    </div>
  );
}

export default Avatar;
