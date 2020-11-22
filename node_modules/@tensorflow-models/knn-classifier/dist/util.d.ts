import * as tf from '@tensorflow/tfjs-core';
export declare function concatWithNulls(ndarray1: tf.Tensor2D, ndarray2: tf.Tensor2D): tf.Tensor2D;
export declare function topK(values: Float32Array, k: number): {
    values: Float32Array;
    indices: Int32Array;
};
