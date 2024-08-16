import {useState} from 'react';
import {ChangeEvent, useRef} from 'react';
import {getImageFromInputEvent} from '@/utils/getImageFromInputEvent';
import {getFullImageSource} from '@/utils/getFullImageSource';

import ProfileImage from '@/components/atoms/Image/ProfileImage';
import NoProfile from '@/assets/no-profile.png';

interface ImageUploadButtonProps {
  userPicture?: string;
  onChangeFile?: (image: File) => void;
  onChangePreview?: (image: string) => void;
}

const ImageUploadButton = ({
  userPicture,
  onChangeFile,
  onChangePreview,
}: ImageUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleImageChangeClick = () => {
    inputRef.current?.click();
  };

  const handleImagePreview = async (e: ChangeEvent<HTMLInputElement>) => {
    const {file, preview} = await getImageFromInputEvent(e);
    if (file !== null && preview !== null) {
      onChangeFile?.(file);
      onChangePreview?.(preview);
      setIsImageSelected(true);
    }
  };

  const imageSrc = isImageSelected
    ? userPicture
    : getFullImageSource(userPicture || NoProfile);

  console.log(isImageSelected);
  console.log(getFullImageSource(userPicture));
  return (
    <div onClick={handleImageChangeClick} className="relative w-fit h-fit">
      <input
        ref={inputRef}
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImagePreview}
        className="hidden"
      />
      <div className="absolute flex items-center justify-center w-20 h-20 text-2xl font-bold transition-opacity bg-gray-200 rounded-full opacity-0 hover:opacity-30">
        +
      </div>
      <ProfileImage src={imageSrc || ''} size="5rem" />
    </div>
  );
};

export default ImageUploadButton;