/*const starRadius =  0.3;  
const starWidthSegments = 12;  
const starHeightSegments = 11;  */

//Skybox
const skyboxTexture = new THREE.TextureLoader().load("./Textures/skyboxStars.png");
const skyboxGeo = new THREE.BoxGeometry(10000, 0, 10000);
const skyboxMaterial = new THREE.MeshBasicMaterial( { map: skyboxTexture } );
const skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);


//Fazer à lua
const moonRadius = 0.5;  
const moonWidthSegments = 20;  
const moonHeightSegments = 20;  


const moonTexture = new THREE.TextureLoader().load("./Textures/moonTexture.jpg");
const MoonGeometry = new THREE.SphereGeometry(moonRadius, moonWidthSegments, moonHeightSegments);
const moonMaterial = new THREE.MeshBasicMaterial( {map: moonTexture} );
const moon = new THREE.Mesh(MoonGeometry, moonMaterial);



//Fire
var fire;
var lenha = new THREE.Group();
var fogueira;




//Floor
const floorRadius =  0.35;  
const floorSegments = 30;  
const floorGeometry = new THREE.CircleGeometry(floorRadius, floorSegments);
var FirePitFloor;


var ambientLight;
// function AddAxe(){

//     const Axe = new THREE.Group();

//     /* Pega do Machado */
//     const radiusTop =  0.008;  
//     const radiusBottom =  radiusTop;  
//     const height = 0.15;  
//     const radialSegments = 50;  

//     const CylinderTexture = new THREE.TextureLoader().load("./Textures/treeTexture2.png");
//     const CylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
//     const CylinderMaterial = new THREE.MeshBasicMaterial( { map: CylinderTexture } );
//     const AxeStick = new THREE.Mesh(CylinderGeometry, CylinderMaterial);

//     AxeStick.position.set(0, 0, 0);   

//     /* cabeça do machado */
//     const HeadWidth =  0.04;  
//     const HeadHeight =  0.05;  
//     const depth =  0.03;  
//     const widthSegments =  3;  
//     const heightSegments =  3;  
//     const depthSegments =  4;  

//     const CubeGeo = new THREE.BoxGeometry(HeadWidth, HeadHeight, depth, widthSegments, heightSegments, depthSegments);
//     const CubeMaterial = new THREE.MeshBasicMaterial( { color: 0x808080} );
//     const AxeHead = new THREE.Mesh(CubeGeo, CubeMaterial);

//     AxeHead.position.set(0, 0.04, 0);

//     /* Ponta da Cabeça do Machado */
//     //cena.add(AxeHead);
//     /*const AxeTipradiusTop =  0.04;  
//     const AxeTipradiusBottom =  0.04;  
//     const AxeTipHeight =  0.1;  
//     const AxeTipRadialSegments = 13;  
//     const AxeTipHeightSegments =  5;  
//     const openEnded = false;  
//     const thetaStart = Math.PI * 1.62;  
//     const thetaLength = Math.PI * 0.48;  

//     const AxeTipGeo = new THREE.CylinderGeometry(AxeTipradiusTop, AxeTipradiusBottom, AxeTipHeight, AxeTipRadialSegments, AxeTipHeightSegments, openEnded, thetaStart, thetaLength);
//     const AxeTipMaterial = new THREE.MeshBasicMaterial( { color: 0x808080} );
//     const AxeTip = new THREE.Mesh(AxeTipGeo, AxeTipMaterial);*/


//     Axe.add(AxeStick, AxeHead);
//     cena.add(Axe);
// }

//Adicionar chão
function AddFloor(){
    const grasstexture = new THREE.TextureLoader().load("./Textures/grass.jpg");
    const floorGeometry = new THREE.PlaneBufferGeometry( 300, 300, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { map: grasstexture } );
    const floor = new THREE.Mesh( floorGeometry, material );
    floor.receiveShadow = true;
    grasstexture.wrapS = THREE.RepeatWrapping;
    grasstexture.wrapT = THREE.RepeatWrapping;
    grasstexture.repeat.set( 1000, 1000 ); 
    
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -0.38, 0)
    
    cena.add( floor );
}


function AddScene(){
    //Adiciona para podermos ver o eixo 

    //Vermelho -> x
    //Verde -> y
    //Azul -> z
    /*const axesHelper = new THREE.AxesHelper( 5 );
    cena.add( axesHelper );*/
    
    AddFirePitLight(0,0,0);
    AddAmbientLight();
    AddFloor();
    AddSkybox();
    AddMoon();
    AddFirePit();
    addSkyLight();
    createFlashlight();
    //AddAxe();
    //AddMountain();
}

function AddSkybox(){
    
    skyboxTexture.wrapS = THREE.RepeatWrapping;
    skyboxTexture.wrapT = THREE.RepeatWrapping;
    skyboxTexture.repeat.set( 1000, 1000 ); //Repete 1000 vezes para x e y
    
    skybox.position.y = 12;

    cena.add(skybox);
}

/*Função chamada no update*/
function SkyboxRotation(){
    skybox.rotation.y += 0.0001;
}
 
function AddMoon(){
    
    moon.position.x = 10;
    moon.position.y = 8;
    moon.position.z = -7;

    AddMoonLight(moon.position.x, moon.position.y, moon.position.z);
    
    cena.add(moon);

    /**/
}


function MoonRotation(){
    moon.position.x -= 0.001;
}

function AddFirePit(){

//     //Add Floor
    AddGravel();
    
  
    
//     //Add Pedras à volta
    AddRocks();
    AddBiggerRocks();
//     //Add Fogo

    AddWoodSticks();
//     AddFire();

}

function AddWoodSticks(){
    

    //var
     //var materialTronco = new THREE.MeshStandardMaterial( {color: '#964B00'} );

    var materialTronco = new THREE.MeshPhongMaterial({ map: loader.load('./Textures/treeTexture.png') });
    materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
    materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump.png');


    //Tronco grande
    var troncoRadius = 0.08;
    var troncoRadiusBottom = 0.08;
    var troncoHeight = 0.5;
     
    var geometriaTroncoGrande = new THREE.CylinderGeometry(troncoRadius, troncoRadiusBottom, troncoHeight, stickRadialSegments);

    TroncoGrande = new THREE.Mesh(geometriaTroncoGrande, materialTronco);
    TroncoGrande.position.set(0, 0, 0);
    //cena.add(TroncoGrande);
    lenha.add(TroncoGrande);

    /*var initialPositionSticksX = [0, ]
    var initialPositionSticksZ = [0, ]*/
    var stickRadius = 0.01;
    var stickRadiusBottom = 0.02;
    var stickHeight = 0.8;
    var stickRadialSegments = 10;

    var initialPositionSticksX = [0.07, -0.07, 0.07, -0.07];
    var initialPositionSticksY = [-0.03, 0.12, 0.17, -0.17];
    //var initialPositionSticksZ = [0.02, -0.02, 0.02, -0.02];
    var rotationGalhoX = [Math.PI/3, Math.PI/4, Math.PI/5, Math.PI/6];
    var rotationGalhoZ = [Math.PI/5, -Math.PI/6, Math.PI/3, Math.PI/4];
    
    for(var i = 0; i < 4; i++){
        
        stickRadius = Math.random() * (0.03 - (0.01)) + (0.01);
        stickRadiusBottom = Math.random() * (0.03 - (0.01)) + (0.01);
        stickHeight = Math.random() * (0.25 - (0.15)) + (0.15);

        var geometriaGalho = new THREE.CylinderGeometry(stickRadius, stickRadiusBottom, stickHeight, stickRadialSegments);
        galho = new THREE.Mesh(geometriaGalho, materialTronco);

        galho.rotation.z = rotationGalhoZ[i];
        galho.position.set(initialPositionSticksX[i], initialPositionSticksY[i], 0);
        //cena.add(galho);
        lenha.add(galho);
    }
    for(var i = 0; i < 4; i++){
        
        stickRadius = Math.random() * (0.03 - (0.01)) + (0.01);
        stickRadiusBottom = Math.random() * (0.03 - (0.01)) + (0.01);
        stickHeight = Math.random() * (0.25 - (0.15)) + (0.15);

        var geometriaGalho = new THREE.CylinderGeometry(stickRadius, stickRadiusBottom, stickHeight, stickRadialSegments);
        galho = new THREE.Mesh(geometriaGalho, materialTronco);

        galho.rotation.x = rotationGalhoX[i];
        galho.position.set(0, initialPositionSticksY[i], initialPositionSticksX[i]);
        //cena.add(galho);
        lenha.add(galho);
    }
    var xLenha=[0.1,0,-0.1,0];
    var zLenha=[0,0.1,0,-0.1];
    lenha.scale.set(0.3,0.3,0.3);
    fogueira=lenha.clone();
    for(let c=0;c<4;c++)
    {
        // console.log("Inseriu o pau n: " + c);
        // console.log("Posi x: " + xLenha[c]);
        // console.log("Posi z: " + zLenha[c]);

        fogueira.position.set(xLenha[c],-0.36, zLenha[c]);
       
        if(xLenha[c]!=0 )
        {
            fogueira.rotation.z=Math.PI/2;
            fogueira.rotation.y=Math.PI/2;
        }
        else
        {
            fogueira.rotation.z=Math.PI/2;
            fogueira.rotation.y=-Math.PI;
        }
        
        cena.add(fogueira.clone());
        
    }
    xLenha=[0.1,0,-0.1,0];
    zLenha=[0,0.1,0,-0.1];
    changePosition=[0.05,-0.05,-0.05,0.05];
    for(let c=0;c<4;c++)
    {
        // console.log("Inseriu o pau n: " + c);
        // console.log("Posi x: " + xLenha[c]);
        // console.log("Posi z: " + zLenha[c]);

        fogueira.position.set(xLenha[c],-0.36, zLenha[c]);
       
        if(xLenha[c]==0 )
        {
            fogueira.rotation.z=Math.PI/2;
            fogueira.rotation.y=Math.PI/2;
            fogueira.position.x=changePosition[c];
            
            if(c==1){
                fogueira.rotation.x=-Math.PI/6;
                fogueira.position.z=0.05;
            }
            else
            {
                fogueira.rotation.x=Math.PI/6;
                fogueira.position.z=-0.05;
            }
               
        }
        else
        {
            //fogueira.rotation.z=Math.PI/2;
            fogueira.rotation.y=-Math.PI;
            fogueira.rotation.x=0;
            fogueira.position.z=changePosition[c];
            
            if(c==0)
            {
                fogueira.rotation.z=Math.PI/3;
                fogueira.position.x=0.05;
            }
            else
            {
                fogueira.rotation.z=-Math.PI/3;
                fogueira.position.x=-0.05;
            }
        }
        
        cena.add(fogueira.clone());
        
    }
}

function AddBiggerRocks(){
    
    var bigRockRadius = 0.3;
    var loader = new THREE.FBXLoader();
    /*var xPosition = [0.3, 0.15, 0, -0.15, -0.3, -0.15, 0, 0.15];
    var zPosition = [0, 0.15, 0.3, 0.15, 0, -0.15, -0.3, -0.15];*/
    var xPosition = [bigRockRadius, bigRockRadius*Math.cos(Math.PI/4), 0, -bigRockRadius*Math.cos(Math.PI/4), -bigRockRadius, -bigRockRadius*Math.cos(Math.PI/4), 0, bigRockRadius*Math.cos(Math.PI/4)];
    var zPosition = [0, bigRockRadius*Math.sin(Math.PI/4), bigRockRadius, bigRockRadius*Math.sin(Math.PI/4), 0, -bigRockRadius*Math.sin(Math.PI/4), -bigRockRadius, -bigRockRadius*Math.sin(Math.PI/4)];


        
        loader.load("./Objetos/rock.fbx", function(rock) {
            //console.log("Criou a pedra:  " + i);

            const bigRockTexture = new THREE.TextureLoader().load("./Textures/bigRockTexture.png");
            const bigRockNormalTexture = new THREE.TextureLoader().load("./Textures/bigRockNormal.jpg");
            
            /*rock.material.map = bigRockTexture;
            rock.material.bumpMap = bigRockNormalTexture;
            
            rock.material.needsUpdate = true;*/
    
            rock.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    
                    // apply texture
                    child.castShadow = true
                    child.material.map = bigRockTexture
                    child.material.bumpMap = bigRockNormalTexture
                    child.material.needsUpdate = true;
                }
            });
    
            /*
            rock.position.set(xPosition[i], 0, zPosition[i]);*/
            for(var i = 0; i < 8; i++){
                
               // console.log("x: " + xPosition[i]);
                //console.log("z: " + zPosition[i]);

                var tempRock = rock.clone();
                tempRock.scale.set(0.1, 0.08, 0.1);

                tempRock.position.x = 1 + xPosition[i];
                tempRock.position.y = -0.45;
                tempRock.position.z = -0.12 + zPosition[i];

                //tempRock.rotation.y = Math.random() * 2;
                
                cena.add(tempRock);
                //console.log("Pedra adicionada: " + i);
                
            }

            //cena.add(rock);
    
        });

    

    

    // const radiusTop =  0.1;  
    // const radiusBottom = 0.08;  
    // const height = 0.3;  
    // const radialSegments = 12;  

    // const bigRockGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    // const bigRockMaterial = new THREE.MeshPhongMaterial({ color: '#ffffff' });
  
    // bigRock = new THREE.Mesh( bigRockGeo, bigRockMaterial );
    // bigRock.position.set(0, -0.01, 0);


    // /*Extremidades da pedra*/
    // const widthSegments = 12;

    // const bigRockPontaGeo = new THREE.SphereGeometry(radiusTop, widthSegments, widthSegments);
    // const bigRockPontaMaterial = new THREE.MeshPhongMaterial({ color: '#ffffff' });
  
    // bigRockPonta = new THREE.Mesh( bigRockPontaGeo, bigRockPontaMaterial );
    // bigRockPonta.position.set(0, 0.12, 0);



    // const bigRockPonta2Geo = new THREE.SphereGeometry(radiusBottom, widthSegments, widthSegments);
    // const bigRockPonta2Material = new THREE.MeshPhongMaterial({ color: '#ffffff' });
  
    // bigRockPonta2 = new THREE.Mesh( bigRockPonta2Geo, bigRockPonta2Material );
    // bigRockPonta2.position.set(0, -0.12, 0);

    // cena.add(bigRock);
    // cena.add(bigRockPonta);
    // cena.add(bigRockPonta2);

}

function AddRocks(){

    const radius =  0.01;  
    const detail = 0; 
    const rockGeometry = new THREE.DodecahedronGeometry(radius, detail);
    const smallRocksTexture = new THREE.TextureLoader().load("Textures/smallRockTexture.jpg");
    
    //map: grayTexture, bumpMap: grayBumpTexture, 

    const material = new THREE.MeshPhongMaterial({ map: smallRocksTexture, color: '#abcdef' });
    /*const grayTexture = new THREE.TextureLoader().load("Textures/gravelTexture.jpg");
    const grayBumpTexture = new THREE.TextureLoader().load("Textures/gravelBumpTexture.jpg");*/

    for(i = 0; i < 80; i++){

        const rock = new THREE.Mesh( rockGeometry, material );
        //criou=false;
        
        //do{
            var xValue = Math.random() * (floorRadius + 0.8 - (-floorRadius - 0.8)) + (-floorRadius - 0.8);
            var zValue = Math.random() * (floorRadius + 0.8 - (-floorRadius - 0.8)) + (-floorRadius - 0.8);
            /*if(xValue > (Math.PI * (floorRadius-0.002)*(floorRadius-0.002)) && xValue<(Math.PI * (floorRadius-(-0.002)*(floorRadius-(-0.002)))) && zValue > (Math.PI * (floorRadius-0.002)*(floorRadius-0.002)) && zValue<(Math.PI * (floorRadius-(-0.002)*(floorRadius-(-0.002))))){
                criou = true;
            }*/

            /*if(xValue > ((floorRadius - 0.5)) && xValue < (floorRadius+0.5) && zValue > ((floorRadius - 0.5)) && zValue<(floorRadius+0.5)){
                criou = true;
            }*/

        //}while(criou)
        
        rock.position.set(xValue, -0.385, zValue);

        rock.castShadow = true;
        cena.add(rock);

    }

}


function AddGravel(){
    
    const grayTexture = new THREE.TextureLoader().load("Textures/gravelTexture.jpg");
    const grayBumpTexture = new THREE.TextureLoader().load("Textures/gravelBumpTexture.jpg");

    const material = new THREE.MeshPhongMaterial({ map: grayTexture, bumpMap: grayBumpTexture, color: '#ffffff' });
  
    FirePitFloor = new THREE.Mesh( floorGeometry, material );
    
    FirePitFloor.position.set(0, -0.365, 0);
    FirePitFloor.rotation.x = -Math.PI/2;
    cena.add(FirePitFloor);
    //Add terra
    const dirtTexture = new THREE.TextureLoader().load("/Textures/dirtTexture2.png");

    const dirtMaterial = new THREE.MeshPhongMaterial({map: dirtTexture, transparent:true, opacity:0.8});
    const dirtGeometry = new THREE.CircleGeometry(floorRadius + 0.5, floorSegments);
      
    dirt = new THREE.Mesh( dirtGeometry, dirtMaterial );
    dirt.position.set(0, -0.37, 0);
    dirt.rotation.x = -Math.PI/2;

    cena.add(dirt);
    
    
}