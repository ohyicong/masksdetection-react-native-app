import { Tensor3D } from '@tensorflow/tfjs-core';
/**
 * Decode a JPEG-encoded image to a 3D Tensor of dtype `int32`.
 *
 * ```js
 * // Load an image as a Uint8Array
 * const imageUri = 'http://image-uri-here.example.com/image.jpg'; *
 * const response = await fetch(imageUri, {}, { isBinary: true });
 * const imageDataArrayBuffer = await response.arrayBuffer();
 * cosnt imageData = new Uint8Array(imageDataArrayBuffer);
 *
 * // Decode image data to a tensor
 * const imageTensor = decodeJpeg(imageData);
 * ```
 *
 * @param contents The JPEG-encoded image in an Uint8Array.
 * @param channels An optional int. Defaults to 3. Accepted values are
 *     0: use the number of channels in the JPG-encoded image.
 *     1: output a grayscale image.
 *     3: output an RGB image.
 * @returns A 3D Tensor of dtype `int32` with shape [height, width, 1/3].
 *
 * @doc {heading: 'Media', subheading: 'Images'}
 */
export declare function decodeJpeg(contents: Uint8Array, channels?: 0 | 1 | 3): Tensor3D;
