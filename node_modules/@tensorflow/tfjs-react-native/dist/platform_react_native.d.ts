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
import '@tensorflow/tfjs-backend-cpu';
import * as tf from '@tensorflow/tfjs-core';
import { Platform } from '@tensorflow/tfjs-core';
/**
 * Makes an HTTP request.
 * @param path The URL path to make a request to
 * @param init The request init. See init here:
 *     https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 * @param options A RequestDetails object.
 *    - __options.isBinary__ boolean indicating whether this request is for a
 *     binary file.
 *
 * @doc {heading: 'Platform helpers', subheading: 'http'}
 */
export declare function fetch(path: string, init?: RequestInit, options?: tf.io.RequestDetails): Promise<Response>;
export declare class PlatformReactNative implements Platform {
    /**
     * Makes an HTTP request.
     *
     * see @fetch docs above.
     */
    fetch(path: string, init?: RequestInit, options?: tf.io.RequestDetails): Promise<Response>;
    /**
     * Encode the provided string into an array of bytes using the provided
     * encoding.
     */
    encode(text: string, encoding: string): Uint8Array;
    /** Decode the provided bytes into a string using the provided encoding. */
    decode(bytes: Uint8Array, encoding: string): string;
    now(): number;
}
