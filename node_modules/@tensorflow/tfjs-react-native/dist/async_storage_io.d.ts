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
import { io } from '@tensorflow/tfjs-core';
/**
 * Factory function for AsyncStorage IOHandler.
 *
 * This `IOHandler` supports both `save` and `load`.
 *
 * For each model's saved artifacts, three items are saved to async storage.
 *   - `tensorflowjs_models/${modelPath}/info`: Contains meta-info about the
 *     model, such as date saved, type of the topology, size in bytes, etc.
 *   - `tensorflowjs_models/${modelPath}/model_without_weight`: The topology,
 *     weights_specs and all other information about the model except for the
 *     weights.
 *   - `tensorflowjs_models/${modelPath}/weight_data`: Concatenated binary
 *     weight values, stored as a base64-encoded string.
 *
 * ```js
 *  async function asyncStorageExample() {
 *    // Define a model
 *    const model = tf.sequential();
 *    model.add(tf.layers.dense({units: 5, inputShape: [1]}));
 *    model.add(tf.layers.dense({units: 1}));
 *    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
 *
 *    // Save the model to async storage
 *    await model.save(asyncStorageIO('custom-model-test'));
 *    // Load the model from async storage
 *    await tf.loadLayersModel(asyncStorageIO('custom-model-test'));
 * }
 * ```
 *
 * @param modelPath A unique identifier for the model to be saved. Must be a
 *   non-empty string.
 * @returns An instance of `IOHandler`
 *
 * @doc {heading: 'Models', subheading: 'IOHandlers'}
 */
export declare function asyncStorageIO(modelPath: string): io.IOHandler;
