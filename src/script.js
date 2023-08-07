import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'


// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    //TODO::

   

    const hemisphericLight = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0), scene);
    hemisphericLight.intensity = 0.2;

    const spotLight= new BABYLON.SpotLight("SpotLight",new BABYLON.Vector3(-1,1,-1),new BABYLON.Vector3(0,-1,-3),Math.PI/4,10,scene);
    spotLight.diffuse= new BABYLON.Color3( 0, 1, 0);
    spotLight.specular= new BABYLON.Color3(1,0,0)
    spotLight.intensity=0.7;

    const spotLight2= new BABYLON.SpotLight("SpotLight2",new BABYLON.Vector3(1,1,1),new BABYLON.Vector3(1,-1,1),Math.PI/4,10,scene);
    spotLight2.diffuse= new BABYLON.Color3( 1, 0, 0);
    spotLight2.specular= new BABYLON.Color3(0,1,0);
    spotLight2.intensity=0.7;

    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    camera.position.z = 3
    camera.panningSensibility = 0;

    camera.allowUpsideDown = false;
    camera.lowerRadiusLimit = 3.95;
    camera.upperRadiusLimit = 50;
    camera.wheelPrecision = 80;



    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const box= BABYLON.MeshBuilder.CreateBox("mesh", {height: 2.5, width: 3, depth: 3});    
     let material = new BABYLON.StandardMaterial("Box Material", scene);
     box.material = material;

    const ground= BABYLON.MeshBuilder.CreateGround("Ground", {width:20,height:20},scene);
     ground.position.y=-1.25;

     const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 3.7, height: 3.2, tessellation: 3});
     roof.scaling.x = 0.75;
     roof.rotation.z = Math.PI / 2;
     roof.rotation.y = Math.PI / 2;
     roof.position.y = 1.9;
    

     const door = BABYLON.MeshBuilder.CreateBox("Door",{height:1.75,width:1,depth:0.03},scene);
     door.position.z=-1.5;
     door.position.y=-0.37;
     door.position.x=-0.7;
     

     const bush1= BABYLON.MeshBuilder.CreateSphere("Bush1",{diameter:1},scene);
     bush1.position.x=1;
     bush1.position.y=-1.25;
     bush1.position.z=-1.5;
     bush1.scaling.y=1.3;
     bush1.scaling.x=1.2;

     const bush2= BABYLON.MeshBuilder.CreateSphere("Bush2",{diameter:0.75},scene);
     bush2.position.x=0.4;
     bush2.position.y=-1.25;
     bush2.position.z=-1.5;

     const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 100.0 }, scene);
    for(let i=0;i<200;i++)
    {
        const angle = Math.random() * Math.PI *2;
        const radius = 1 + Math.random() * 7;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
      const rainEffect = new BABYLON.ParticleSystem("RainEffect",50,scene);
      rainEffect.particleTexture = new BABYLON.Texture("trace_01.png");
      rainEffect.emitter = new BABYLON.Vector3(x,10,z);
      rainEffect.emitRate=200;
      rainEffect.gravity= new BABYLON.Vector3(x,-20,z);
      rainEffect.startDelay= Math.random() *5000;
      rainEffect.start();
    }

     for(let i=0;i<10;i++){
        const angle = Math.random() * Math.PI *2
        const radius = 3.5 + Math.random() * 6
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        const grave= BABYLON.CreateBox("Graves",{height:1,width:1,depth:0.25},scene);
        grave.position.set(x, -0.75, z);
        grave.castShadow = true;

        const grave2=BABYLON.CreateCylinder("Graves2",{height:0.25,diameter:1},scene);
        grave2.rotation.x=Math.PI/2;
        grave2.position.set(x,-0.25,z);
        grave.castShadow=true;

        const cross1= BABYLON.CreateBox("cross1",{height:2,width:0.4,depth:0.4},scene);
        cross1.position.set(x+1.5,-0.25,z);
        cross1.castShadow=true;

        const cross2= BABYLON.CreateBox("cross2",{height:0.4,width:1.25,depth:0.4},scene);
        cross2.position.set(x+1.5,0.25,z);
        cross2.castShadow=true;

     }

    

     
    // Textures
     const grass= new BABYLON.StandardMaterial("Grass");
     grass.diffuseTexture = new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dWzjALPYOO8bEiMy-m1NGUQ7FSVdHOU2EA&usqp=CAU",scene)
     ground.material=grass;
     
     const roofTiles = new BABYLON.StandardMaterial("RoofTiles");
     roofTiles.diffuseTexture= new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShjMzFuaIorvDvdDRQFKZAVcpQ0pr3e7aVcQ&usqp=CAU",scene) 
     roof.material=roofTiles;

     const brickWall= new BABYLON.StandardMaterial("BrickWall")
     brickWall.diffuseTexture= new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8Mnv8_Tkd_4RLjcmBjuUXq3cEKuYLr72Vw&usqp=CAU",scene);
     box.material=brickWall;

     const bush= new BABYLON.StandardMaterial("Bush")
     bush.diffuseTexture= new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEA0PgwKYV5OuCwHmQwLppe-tT-qP8mJNJyw&usqp=CAU",scene);
     bush1.material=bush;
     bush2.material=bush;

     const doorTexture= new BABYLON.StandardMaterial("BrickWall");
     doorTexture.diffuseTexture= new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEZbHf2cazhiGsQOb0Gm3B7m4ADd2coWiGw&usqp=CAU",scene);
     door.material=doorTexture;
  
     const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
     skyboxMaterial.backFaceCulling = false;
     skyboxMaterial.disableLighting = true;
     skyboxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
     skybox.infiniteDistance = true;
     skybox.material = skyboxMaterial;

     scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.29, 0.29, 0.28);
    scene.fogDensity = 0.1;



    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene

engine.runRenderLoop(function () {

    scene.render();
});

const onResize = () => {
    canvas.width = getWidth();
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);