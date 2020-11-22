/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/// <reference types="webgl2" />
/// <reference types="react" />
import * as tf from '@tensorflow/tfjs-core';
interface Dimensions {
    width: number;
    height: number;
    depth: number;
}
interface Size {
    width: number;
    height: number;
}
interface FromTextureOptions {
    alignCorners?: boolean;
    interpolation?: 'nearest_neighbor' | 'bilinear';
}
/**
 * Utility function that tests the GL context for capabilities to enable
 * optimizations.
 *
 * For best performance this should be be called once before using the other
 * camera related functions.
 *
 * @doc {heading: 'Media', subheading: 'Camera'}
 */
export declare function detectGLCapabilities(gl: WebGL2RenderingContext): Promise<void>;
/**
 * Transfers tensor data to an RGB(A) texture.
 *
 * @param gl the WebGL context that owns the texture.
 * @param imageTensor the tensor to upload
 * @param texture optional the target texture. If none is passed in a new
 *     texture will be created.
 *
 * @doc {heading: 'Media', subheading: 'Camera'}
 */
export declare function toTexture(gl: WebGL2RenderingContext, imageTensor: tf.Tensor3D, texture?: WebGLTexture): Promise<WebGLTexture>;
/**
 * Creates a tensor3D from a texture.
 *
 * Allows for resizing the image and dropping the alpha channel from the
 * resulting tensor.
 *
 * Note that if you the output depth is 3 then the output width should be a
 * multiple of 4.
 *
 * @param gl the WebGL context that owns the input texture
 * @param texture the texture to convert into a tensor
 * @param sourceDims source dimensions of input texture (width, height, depth)
 * @param targetShape desired shape of output tensor
 *
 * @doc {heading: 'Media', subheading: 'Camera'}
 */
export declare function fromTexture(gl: WebGL2RenderingContext, texture: WebGLTexture, sourceDims: Dimensions, targetShape: Dimensions, options?: FromTextureOptions): tf.Tensor3D;
/**
 * Render a texture to the GLView. This will use the default framebuffer
 * and present the contents of the texture on the screen.
 *
 * @param gl
 * @param texture
 * @param dims Dimensions of tensor
 *
 * @doc {heading: 'Media', subheading: 'Camera'}
 */
export declare function renderToGLView(gl: WebGL2RenderingContext, texture: WebGLTexture, size: Size, flipHorizontal?: boolean): void;
export {};
