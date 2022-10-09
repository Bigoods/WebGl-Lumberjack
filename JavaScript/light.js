var lanternaLigada = true;
const spotLight = new THREE.SpotLight( 0xFFFF66 );
var fireLight = new THREE.PointLight( 0xffc40c, 0.3);
var moonLight = new THREE.PointLight( 0xffffff, 0.3);

//Luz lanterna
function AtualizaLanternaPosition(){


    //Get camera position




    spotLight.position.set( 0, 0, 0 );

    spotLight.castShadow = true;

    /*spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    spotLight.target.position.set(0,0,z);*/
    /*var target = new THREE.Object3D();
    target = object;

    */
    spotLight.angle = 0.15;
    spotLight.distance = 160;
    spotLight.target = lightTarget;
    
    
    lanterna.add( spotLight );
    //spotLight.target = rayCaster.ray.origin + rayCaster.ray.direction;
}

function RemoveLanterna(){
    lanterna.remove(spotLight);
}

//Luz lua
var MoonOn= true;
var moonLight = new THREE.PointLight(0xdfebff, 0.2);
function AddMoonLight(x, y, z){   
    // var light = new THREE.DirectionalLight(0xdfebff, 1);
    // light.position.set(3, 3, 3);
    // light.position.multiplyScalar(1.3);

    // light.castShadow = true;
    // light.shadowCameraVisible = true;
    // cena.add(light);
    // const helper = new THREE.DirectionalLightHelper( light, 5 );
    // cena.add( helper );



    /* Luz da lua no solo */
    
    moonLight.position.set( x,y,z );
    moonLight.castShadow = true;   

    //Set up shadow properties for the light
    moonLight.shadow.camera.near = 0.5; // default
    moonLight.shadow.camera.far = 500; // default
    


    
    //light.shadowDarkness = 1;
    // const helper = new THREE.DirectionalLightHelper( light, 5 );
    // cena.add( helper );

    cena.add(moonLight);
    
    // /*Para dar brilho à lua*/ 

}
function removeMoonLight()
{
    cena.remove(moonLight);

}

var skyLight = new THREE.DirectionalLight( 0xffffff, 0.08 );
/*skyLight.shadow.camera.left = -300;
skyLight.shadow.camera.right = 300;
skyLight.shadow.camera.top = 10; 
skyLight.shadow.camera.Bottom = -300;*/
var skyOn=true;

//Cubo que será target
const cuboLightGeo = new THREE.BoxGeometry(0.0002, 0.0002, 0.2);
var cuboLightmaterial= new THREE.MeshStandardMaterial( {color: '#228b22', opacity: 0.9} );
var cuboLightForDirectionalLight = new THREE.Mesh(cuboLightGeo, cuboLightmaterial);

function addSkyLight()
{
    
    cuboLightForDirectionalLight.position.set(0, -0.40, 0); //Debaixo do chão
    cena.add(cuboLightForDirectionalLight);

    skyLight.position.y=10;
    //skyLight.position.x=10;
    skyLight.castShadow = true;   
    cuboLightForDirectionalLight.add(skyLight);  
    // const helper = new THREE.DirectionalLightHelper( skyLight, 5 );
    // cena.add( helper );
    //console.log("Entrou na ativação");
}
function removeSkyLight()
{
    //console.log("Entrou na desativação");
    cena.remove(cuboLightForDirectionalLight);
    cuboLightForDirectionalLight.remove(skyLight);
}


var firePitLight = true;
//Add Lareira Luz
function AddFirePitLight(x, y, z){   
    // var light = new THREE.DirectionalLight(0xdfebff, 1);
    // light.position.set(3, 3, 3);
    // light.position.multiplyScalar(1.3);

    // light.castShadow = true;
    // light.shadowCameraVisible = true;
    // cena.add(light);
    // const helper = new THREE.DirectionalLightHelper( light, 5 );
    // cena.add( helper );



    /* Luz da lua no solo */

    fireLight.position.set( x,y,z );
    fireLight.castShadow = true;   

    //Set up shadow properties for the light
    fireLight.shadow.camera.near = 0.5; // default
    fireLight.shadow.camera.far = 500; // default
    


    
    //light.shadowDarkness = 1;
    // const helper = new THREE.DirectionalLightHelper( light, 5 );
    // cena.add( helper );
    cena.add(fireLight);
    cena.add(fogo);
    // /*Para dar brilho à lua*/ 

}

function removeFirePitLight(){
    cena.remove(fireLight);
    cena.remove(fogo);
}


var ambientLight = new THREE.AmbientLight( 0x201F1F );
var AmbienteOn=true;
//Adicionar a luz
function AddAmbientLight(){

    //Luz ambiente para podermos ver atrás dos objetos
    
    cena.add(ambientLight);
    //cena.add(Directionallight);

}
function RemoveAmbientLight(){
    cena.remove(ambientLight);
}
