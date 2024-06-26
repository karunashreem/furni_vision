import * as THREE from './three.module.js';
console.log("Three", THREE);
document.addEventListener("DOMContentLoaded", async ()=>{
    const scene= new THREE.Scene();

    const geometry= new THREE.BoxGeometry(1, 1, 1);
    const material= new THREE.MeshBasicMaterial({color:'0000FF'});
    const cube= new THREE.Mesh(geometry, material);

    cube.position.set(0,0,-2);
    cube.rotation.set(0,Math.PI/4,0);
    scene.add(cube);
    
    const camera=new THREE.PerspectiveCamera( );
    camera.position.set(1,1,5);

    const renderer= new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(500,500);
    renderer.render(scene, camera);

    const video= document.createElement("video");
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) =>{
        video.srcObject=stream;
        video.play();     
    });
    video.style.position="absolute";
    video.style.width=renderer.domElement.width;
    video.style.height=renderer.domElement.height;
    renderer.domElement.style.position="absolute";

    document.body.appendChild(video);
    document.body.appendChild(renderer.domElement);

    const ar= new SOME_AR_ENGINE();
    while(true){
        await nextVideoFrameReady();
        const {position, rotation}= ar.computeCameraPose(video);
        cube.position=position;
        cube.rotation=rotation;
    }
    
});