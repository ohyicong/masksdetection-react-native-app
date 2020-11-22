/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as React from 'react';
import * as tf from '@tensorflow/tfjs-core';
import { LayoutChangeEvent } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
interface WrappedComponentProps {
    onLayout?: (event: LayoutChangeEvent) => void;
    [index: string]: any;
}
interface Props {
    cameraTextureWidth: number;
    cameraTextureHeight: number;
    resizeWidth: number;
    resizeHeight: number;
    resizeDepth: number;
    autorender: boolean;
    onReady: (images: IterableIterator<tf.Tensor3D>, updateCameraPreview: () => void, gl: ExpoWebGLRenderingContext, cameraTexture: WebGLTexture) => void;
}
interface State {
    cameraLayout: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
/**
 * A higher-order-component (HOC) that augments the [Expo.Camera](https://docs.expo.io/versions/latest/sdk/camera/)
 * component with the ability to yield tensors representing the camera stream.
 *
 * Because the camera data will be consumed in the process, the original
 * camera component will not render any content. This component provides
 * options that can be used to render the camera preview.
 *
 * Notably the component allows on-the-fly resizing of the camera image to
 * smaller dimensions, this speeds up data transfer between the native and
 * javascript threads immensely.
 *
 * __In addition to__ all the props taken by Expo.Camera. The returned
 * component takes the following props
 *
 * - __cameraTextureWidth__: number — the width the camera preview texture
 *   (see example and note below)
 * - __cameraTextureHeight__: number — the height the camera preview texture
 *   (see example and note below)
 * - __resizeWidth__: number — the width of the output tensor
 * - __resizeHeight__: number — the height of the output tensor
 * - __resizeDepth__: number — the depth (num of channels) of the output tensor.
 *    Should be 3 or 4.
 * - __autorender__: boolean — if true the view will be automatically updated
 *   with the contents of the camera. Set this to false if you want more direct
 *   control on when rendering happens.
 * - __onReady__: (
 *    images: IterableIterator<tf.Tensor3D>,
 *    updateCameraPreview: () => void,
 *    gl: ExpoWebGLRenderingContext,
 *    cameraTexture: WebGLTexture
 *  ) => void — When the component is mounted and ready this callback will
 *  be called and recieve the following 3 elements:
 *    - __images__ is a (iterator)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators]
 *      that yields tensors representing the camera image on demand.
 *    - __updateCameraPreview__ is a function that will update the WebGL render
 *      buffer with the contents of the camera. Not needed when `autorender`
 *      is true
 *    - __gl__ is the ExpoWebGl context used to do the rendering. After calling
 *      `updateCameraPreview` and any other operations you want to synchronize
 *      to the camera rendering you must call gl.endFrameExp() to display it
 *      on the screen. This is also provided in case you want to do other
 *      rendering using WebGL. Not needed when `autorender` is true.
 *    - __cameraTexture__ The underlying cameraTexture. This can be used to
 *      implement your own __updateCameraPreview__.
 *
 * ```js
 * import { Camera } from 'expo-camera';
 * import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
 *
 * const TensorCamera = cameraWithTensors(Camera);
 *
 * class MyComponent {
 *
 *   handleCameraStream(images, updatePreview, gl) {
 *     const loop = async () => {
 *       const nextImageTensor = images.next().value
 *
 *       //
 *       // do something with tensor here
 *       //
 *
 *       // if autorender is false you need the following two lines.
 *       // updatePreview();
 *       // gl.endFrameEXP();
 *
 *       requestAnimationFrame(loop);
 *     }
 *     loop();
 *   }
 *
 *   render() {
 *    // Currently expo does not support automatically determining the
 *    // resolution of the camera texture used. So it must be determined
 *    // empirically for the supported devices and preview size.
 *
 *    let textureDims;
 *    if (Platform.OS === 'ios') {
 *     textureDims = {
 *       height: 1920,
 *       width: 1080,
 *     };
 *    } else {
 *     textureDims = {
 *       height: 1200,
 *       width: 1600,
 *     };
 *    }
 *
 *    return <View>
 *      <TensorCamera
 *       // Standard Camera props
 *       style={styles.camera}
 *       type={Camera.Constants.Type.front}
 *       // Tensor related props
 *       cameraTextureHeight={textureDims.height}
 *       cameraTextureWidth={textureDims.width}
 *       resizeHeight={200}
 *       resizeWidth={152}
 *       resizeDepth={3}
 *       onReady={this.handleCameraStream}
 *       autorender={true}
 *      />
 *    </View>
 *   }
 * }
 * ```
 *
 * @param CameraComponent an expo Camera component constructor
 */
/** @doc {heading: 'Media', subheading: 'Camera'} */
export declare function cameraWithTensors<T extends WrappedComponentProps>(CameraComponent: React.ComponentType<T>): {
    new (props: T & Props): {
        camera: Camera;
        glView: GLView;
        glContext: ExpoWebGLRenderingContext;
        rafID: number;
        componentWillUnmount(): void;
        onCameraLayout(event: LayoutChangeEvent): void;
        /**
         * Creates a WebGL texture that is updated by the underlying platform to
         * contain the contents of the camera.
         */
        createCameraTexture(): Promise<WebGLTexture>;
        /**
         * Callback for GL context creation. We do mose of the work of setting
         * up the component here.
         * @param gl
         */
        onGLContextCreate(gl: ExpoWebGLRenderingContext): Promise<void>;
        /**
         * Helper function that can be used to update the GLView framebuffer.
         *
         * @param gl the open gl texture to render to
         * @param cameraTexture the texture to draw.
         */
        previewUpdateFunc(gl: ExpoWebGLRenderingContext, cameraTexture: WebGLTexture): any;
        /**
         * Render the component
         */
        render(): JSX.Element[];
        context: any;
        setState<K extends "cameraLayout">(state: State | ((prevState: Readonly<State>, props: Readonly<T & Props>) => State | Pick<State, K>) | Pick<State, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<T & Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<T & Props>, nextState: Readonly<State>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<T & Props>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<T & Props>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<T & Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<T & Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<T & Props>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<T & Props>, nextState: Readonly<State>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export {};
