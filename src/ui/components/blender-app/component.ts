
import Component from "@glimmer/component";

const THREE: any = window['THREE'];

const WIDTH: number = 250;
const MESH_Y_POSITION: number = -3.0;
const LIGHT_COLOR = 0xFFFFFF;
const LIGHT_INTENSITY = 25;
const ROTATION_SPEED = 0.01;
const SCALE = 0.75;
const CAMERA_Z_POSITION = 5;
const LIGHT_DISTANCE = 10;
const FOV = 75;
const NEAR_PLANE = 0.1;
const FAR_PLANE = 1000;
const MODEL_PATH = 'hancock-building.json';
const BACKGROUND_COLOR = 0xA9A9A9;
const MATERIAL_COLOR = 0x000000;

export default class Blender extends Component {
  camera: any;
  canvas: HTMLElement;
  geometry: any;
  height: number = WIDTH;
  light: any;
  mesh: any;
  renderer: any;
  scene: any;
  width: number = WIDTH;

  didInsertElement() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.addCanvasToPage();
    this.loadModel(MODEL_PATH);

    this.render = this.render.bind(this);
    this.render();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY);
    this.light.position.set(-LIGHT_DISTANCE, LIGHT_DISTANCE, LIGHT_DISTANCE);
    this.scene.add(this.light);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(FOV, this.width/this.height, NEAR_PLANE, FAR_PLANE);
    this.camera.position.z = CAMERA_Z_POSITION;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(BACKGROUND_COLOR);
  }

  loadModel(path) {
    path = path + `?cacheBust=${Date.now()}`;
    const loader = new THREE.JSONLoader();

    loader.load(path, (geometry) => {
      this.geometry = geometry;
      this.createMesh();
      this.addMesh();
    });
  }

  createMesh() {
    const material = new THREE.MeshStandardMaterial({ color: MATERIAL_COLOR });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.position.y = MESH_Y_POSITION;
    this.mesh.scale.set(SCALE, SCALE, SCALE);
  }

  addMesh() {
    this.scene.add(this.mesh);
  }

  addCanvasToPage() {
    const element = this.element as HTMLElement;
    this.canvas = element.appendChild(this.renderer.domElement);
  }

  render() {
    requestAnimationFrame(this.render);
    if (!this.mesh) { return; }
    this.mesh.rotation.y += ROTATION_SPEED;
    this.renderer.render(this.scene, this.camera);
  }
}

