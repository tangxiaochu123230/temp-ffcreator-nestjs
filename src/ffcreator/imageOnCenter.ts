import { FFImage } from 'ffcreator';
import ImageSize from 'image-size';

// The picture is placed in the middle of the scene, centered up and down, centered left and right
export async function imageOnCenter(config: {
  width: number;
  height: number;
  imagePath: string;
}) {
  const imageInfo = ImageSize(config.imagePath);
  const imageWidth =
    config.width / config.height > imageInfo.width / imageInfo.height
      ? Math.floor(config.height * (imageInfo.width / imageInfo.height))
      : config.width;
  const imageHeight =
    config.width / config.height > imageInfo.width / imageInfo.height
      ? config.height
      : Math.floor(config.width * (imageInfo.height / imageInfo.width));
  const ffimage = new FFImage({
    path: config.imagePath,
    resetXY: true,
    x: Math.floor((config.width - imageWidth) / 2),
    y: Math.floor((config.height - imageHeight) / 2),
    width: imageWidth,
    height: imageHeight,
  });
  return ffimage;
}