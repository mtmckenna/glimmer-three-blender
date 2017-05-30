import Component from "@glimmer/component";
import * as THREE from 'three';

export default class Blender extends Component {
  height: number = 250;
  width: number =  250;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  canvas: HTMLElement;

  didInsertElement() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.addCanvasToPage();
    this.createCube();

    this.scene.add(this.cube);

    this.render = this.render.bind(this);
    this.render();
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    this.camera.position.z = 5;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000044);
  }

  createCube() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
  }

  addCanvasToPage() {
    const element = this.element as HTMLElement;
    this.canvas = element.appendChild(this.renderer.domElement);
  }

  render() {
    requestAnimationFrame(this.render);
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
  }
}

