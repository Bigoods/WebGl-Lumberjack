
var AllTreesFolhas=[];
var AllTreesPosition=[];
var TreesRadius=[];
var AllSeatsPosition=[];
var SeatsSize=[];
const loader = new THREE.TextureLoader();
var AlturaTronco;
var LocalBancos=[1,0,0,-1,-1,0,0,1];
var indice = 0;
var arrayAltura=[];
var machado = new THREE.Group();
var cameraRadius= 0.2;
var arrayTrees=[];
var arrayObjRotate=[];



//Lanterna
var lanterna = new THREE.Group();
var lightTarget = new THREE.Object3D();


//Bancos
function CreateSeat()
{
    for(var k=0;k<5;k++)
    {
        //colisao banco
        const lar =  0.15;   
        const fund = 0.15;  
        
        
        
        

        var rand = THREE.Math.randInt(1, 2);
        var AlturaBanco = Math.random() * (0.8 - (0.6))  + (0.6);
        var radiusTop =  0.08;  
        var radiusBottom =  0.08;  
        var height =  AlturaBanco;  
        var radialSegments = 50;  
        var geometriaTronco = new THREE.CylinderGeometry(
            radiusTop, radiusBottom, height, radialSegments);
        //var materialTronco = new THREE.MeshStandardMaterial( {color: '#964B00'} );
        if(rand==1)
        {
            var materialTronco = new THREE.MeshPhongMaterial({ map: loader.load('./Textures/treeTexture.png') });
            materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
            materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump.png');
        }
        else 
        {
            var materialTronco = new THREE.MeshPhongMaterial({ map: loader.load('./Textures/treeTexture2.png') });
            materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
            materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump2.png');
        }
        var Bancos = new THREE.Mesh(geometriaTronco, materialTronco);

        const invGeo = new THREE.BoxGeometry(lar, AlturaBanco, fund);
        var materialColisao= new THREE.MeshStandardMaterial( {color: '#228b22'} );
        var BancosColisao = new THREE.Mesh(invGeo, materialColisao);
        
        //console.log(Bancos);
        //console.log("Bancos " + LocalBancos[indice]);
        if(LocalBancos[indice]!=0 )
        {
            //console.log("Bancos " + LocalBancos[k]);
            Bancos.rotation.z=Math.PI/2;
            Bancos.rotation.y=Math.PI/2;
            BancosColisao.rotation.z=Math.PI/2;
            BancosColisao.rotation.y=Math.PI/2;
        }
        
        else
        {
            Bancos.rotation.z=Math.PI/2;
            BancosColisao.rotation.z=Math.PI/2;
        }
        Bancos.castShadow = true;
        Bancos.position.y=-0.38;
        Bancos.position.x=LocalBancos[indice];
        indice++;
        Bancos.position.z=LocalBancos[indice];
        indice++;
        //var numSeatSize = "" + AlturaBanco + " " + 2*radiusTop;
        var numSeatSize = "" + AlturaBanco + " " + fund;
        //var numPosition=""+Bancos.position.x+" "+Bancos.position.z;
        BancosColisao.position.set(Bancos.position.x,-0.38,Bancos.position.z);
        var numPosition=""+BancosColisao.position.x+" "+BancosColisao.position.z;
        
        SeatsSize.push(numSeatSize);
        AllSeatsPosition.push(numPosition);
        //console.log("Bancos" + AllSeatsPosition);
        cena.add(Bancos);
        cena.add(BancosColisao);
        BancosColisao.visible=false;
    }
    //Fim Bancos
    
}
function CreateTree()
{
    //Inicializacao da arvore
    for(var j=0;j<10;j++)
    {
        
        var aleatorio = THREE.Math.randInt(1, 2);
        //Folhas
        var radiusTop =  0.0;  
        var radiusBottom = Math.random() * (0.5 - (0.35))  + (0.35);
        var height =  0.5;  
        var radialSegments = 50;  
        var geometriaFolhas = new THREE.CylinderGeometry(
            radiusTop, radiusBottom, height, radialSegments);
        

        //Tronco
        var larguraTemp = Math.random() * (0.09 - (0.05))  + (0.05);
        AlturaTronco = Math.random() * (0.9 - (0.7))  + (0.7);
        var radiusTop =  larguraTemp;  
        var radiusBottom =  larguraTemp;  
        var height =  AlturaTronco;  
        var radialSegments = 50;  
        var geometriaTronco = new THREE.CylinderGeometry(
            radiusTop, radiusBottom, height, radialSegments);
        //var materialTronco = new THREE.MeshStandardMaterial( {color: '#964B00'} );
        if(aleatorio==1)
        {
            var materialTronco = new THREE.MeshPhongMaterial({ map: loader.load('./Textures/treeTexture.png') });
            materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
            materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump.png');
            var materialFolhas= new THREE.MeshStandardMaterial( {color: '#228b22'} );
        }
        else 
        {
            var materialFolhas= new THREE.MeshStandardMaterial( {color: '#006400'} );
            var materialTronco = new THREE.MeshPhongMaterial({ map: loader.load('./Textures/treeTexture2.png') });
            materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
            materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump2.png');
        }
        var Folhas;
        var Folhas2;
        var Folhas3;
        var Tronco;
        
        Folhas = new THREE.Mesh(geometriaFolhas, materialFolhas);
        Folhas.castShadow = true;
        Folhas2 = new THREE.Mesh(geometriaFolhas, materialFolhas);
        Folhas2.castShadow = true;
        Folhas3 = new THREE.Mesh(geometriaFolhas, materialFolhas);
        Folhas3.castShadow = true;
        Tronco = new THREE.Mesh(geometriaTronco, materialTronco);
        Tronco.castShadow = true;
        Folhas["i"]=0;
        Folhas2["i"]=0;
        Folhas3["i"]=0;
        //Fim da arvore
        var x = Math.floor(Math.random() * (10 - (-10)) ) + (-10);
        var z = Math.floor(Math.random() * (10 - (-10)) ) + (-10);
        //Posicao arvores

        //console.log(x);
        //console.log(z);
        var numPosition=""+x+" "+z;
        var radiusTree=radiusBottom;
        //console.log(numPosition);
        if(!AllTreesPosition.includes(numPosition))
        {
            if(!(x<2 && x>-2 && z<2 && z>-2))
            {
                arrayAltura.push(height);
                AllTreesPosition.push(numPosition);
                TreesRadius.push(radiusTree);
                //console.log(AllTreesPosition);
                ConfigureTree(x,z, Folhas, Folhas2, Folhas3, Tronco); 
            }
        }
        
    }
}


function ConfigureTree(x, z, Folhas, Folhas2, Folhas3, Tronco)
{
    const objectToRotateGeometry = new THREE.CylinderGeometry(0.0001, 0.0001, 0.0001, 1);
    var materialobjectToRotate= new THREE.MeshStandardMaterial( {color: '#006400', opacity:0.9} );
    var objectToRotate =  new THREE.Mesh(objectToRotateGeometry, materialobjectToRotate);


    // Folhas.position.x=x;
    // Folhas.position.z=z;
    // Folhas2.position.x=x;
    // Folhas2.position.z=z;
    // Folhas3.position.x=x;
    // Folhas3.position.z=z;
    // Tronco.position.x=x;
    // Tronco.position.z=z;
    objectToRotate.position.set(x, 0, z);


    Folhas.position.y=AlturaTronco-0.4;
    Folhas2.position.y=AlturaTronco-0.1;
    Folhas2.scale.x=0.8;
    Folhas2.scale.y=0.8;
    Folhas2.scale.z=0.8;
    Folhas3.position.y=AlturaTronco+0.15;
    Folhas3.scale.x=0.6;
    Folhas3.scale.y=0.6;
    Folhas3.scale.z=0.6;
    //console.log(Folhas.position.y, AlturaTronco);
    var tree = new THREE.Group();
    tree.add(Tronco, Folhas, Folhas2, Folhas3);
    AllTreesFolhas.push(Folhas);
    AllTreesFolhas.push(Folhas2);
    AllTreesFolhas.push(Folhas3);
    arrayTrees.push(tree);

    //Object para a árvore rodar sobre ela
    
    
    objectToRotate.position.set(x, 0, z);
    cena.add(objectToRotate);
    arrayObjRotate.push(objectToRotate);
    objectToRotate.add(tree);
    //cena.add(Tronco, Folhas, Folhas2, Folhas3);
}


var velocidadeArvores=0.0002;
/*Animação da árvore*/
function animationTree(item)
{
    // console.log(item.position.x);   
    // if(item.position.x>(-0.25) )
    // {
    //     item.position.lerp(new THREE.Vector3(item.position.x-0.3,item.position.y,0),0.001);
        
    // }
    // else if(item.position.x<0.25) {
    //     item.position.lerp(new THREE.Vector3(item.position.x+0.3,item.position.y,0),0.001);
    //     console.log("Entou"); 
    // }
    
    if(item["i"]==0)
    {
        
        item.rotation.z+=velocidadeArvores;
        item.position.z+=velocidadeArvores;
        
        if(item.rotation.z>0.05)
        {
            //console.log("0");
            item["i"]=item["i"]+1;
        }
         
        
    }   
    // else if(item["i"]==1 || item["i"]==4)
    // {
    //     item.rotation.z=0;
    //     item.translateZ( 0 );
    //     if(item["i"]==1)
    //     item["i"]=item["i"]+1;
    //     if(item["i"]==4)
    //     item["i"]=0;
        
    // }
    else 
    {
        
        item.rotation.z-=velocidadeArvores;
        item.position.z-=velocidadeArvores;
        if(item.rotation.z<-0.05)
        {
            //console.log("1");
            item["i"]=0;
        }
        
        
    }
}

function animeTree(item)
{
    animationTree(item);
}

// var intervalId = window.setInterval(function()
// {
//     AllTreesFolhas.forEach(animeTree);
//     /*animationTree(Folhas);
//     animationTree(Folhas2) ;
//     animationTree(Folhas3);*/
// }, 1000);


function CreateAxe() {
    const axeHandleGeo = new THREE.BoxGeometry(4, 0.25, 0.25);
    const materialLight= new THREE.MeshPhongMaterial({ color: 0xa3835b });
    const steelMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
    const handle = new THREE.Mesh(axeHandleGeo, materialLight);
    const axeShape = new THREE.Shape();

    axeShape.moveTo(0, 0.15);
    axeShape.lineTo(1, 1);
    axeShape.lineTo(1.25, 0.5);
    axeShape.lineTo(1.25, -0.5);
    axeShape.lineTo(1, -1);
    axeShape.lineTo(0, -0.15);

    const extrudeSettings = {
        steps: 2,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.25,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const axeGeo = new THREE.ExtrudeBufferGeometry(axeShape, extrudeSettings);
    const buttGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
    const butt1 = new THREE.Mesh(buttGeo, steelMaterial);
    const butt2 = new THREE.Mesh(buttGeo, steelMaterial);
    const butt3 = new THREE.Mesh(buttGeo, steelMaterial);
    const axe1 = new THREE.Mesh(axeGeo, steelMaterial);
    const axe2 = new THREE.Mesh(axeGeo, steelMaterial);

    axe1.castShadow = true;
    axe2.castShadow = true;
    handle.castShadow = true;
    
    var cabecaMachado = new THREE.Group();
    var pegaMachado = new THREE.Group(); 
    
    
    // machado.add(handle);
    // machado.add(axe1);
    // machado.add(axe2);
    // machado.add(butt1);
    // machado.add(butt2);
    // machado.add(butt3);
     

    
    // axe1.position.set(0, 1, 0);
    // axe2.position.set(0, 1, 0);
    
    axe2.rotation.z = -Math.PI ;
    butt1.position.set(1.9, 0, 0);
    butt2.position.set(0, 0, 0);
    butt3.position.set(-1.9, 0, 0);
    //machado.position.set(0,0,-0.12);

    machado.scale.set(x=0.06, y=0.06, z=0.06)
    pegaMachado.add(handle, butt1, butt2, butt3);
    pegaMachado.rotation.z=1.55;
    
    cabecaMachado.add(axe1, axe2);
    cabecaMachado.position.set(0,1,0);
    cabecaMachado.scale.set(x=0.6, y=0.6, z=0.6)
    machado.add(cabecaMachado, pegaMachado);

    machado.rotation.y=2;
    machado.position.z=-0.2;
    machado.position.x=0.07;
    cena.add(machado);
}
var velocidadeMachado=0.1;
function animationAxeCostas()
{
    
    if(movimentoMachado.rotation.x<Math.PI)
    {
        movimentoMachado.rotation.x+= velocidadeMachado;
        //requestAnimationFrame(animationAxeCostas);
    }
}

function animationAxeMao()
{
    if(movimentoMachado.rotation.x>0)
    {
        movimentoMachado.rotation.x-= velocidadeMachado;
        //requestAnimationFrame(animationAxeMao);
    }
}


var cortou=false;

function animationAxeCortar()
{
    
    
    //var offset=new THREE.Vector3(boneco.position.x-1,boneco.position.y, boneco.position.z-1 );
    var offset=new THREE.Vector3(-1,0,-1 );
    //machado.position.lerp(offset, -0.06)
    
    
    
    cortou=true;
    movimentoMachado.position.lerp(offset,0.1);
    
    //machado.rotation.lerp(rotacao, 0.1);
    
    // machado.rotation.z=-Math.PI/6;
    // machado.rotation.y=Math.PI/2;
    // machado.rotation.x=0;


    if(movimentoMachado.position.x>boneco.position.x - 0.99)
    cortar=false;
    
    // if(movimentoMachado.rotation.x<Math.PI)
    // {
    //     console.log(movimentoMachado.rotation.x);
    //     requestAnimationFrame(corta1);
    // }
    // else
    // {
    //     if(movimentoMachado.rotation.x>0)
    //     {
    //         console.log("2");   
    //         requestAnimationFrame(corta2);
    //     }
    //     else 
    //     acabou=1;
        
    // }
    
}
function animationAxeVoltar()
{
    var offset=new THREE.Vector3(boneco.position.x,boneco.position.y, boneco.position.z );
    movimentoMachado.position.lerp(offset,0.1);
    

    
    

    
    // if(movimentoMachado.rotation.x<Math.PI)
    // {
    //     console.log(movimentoMachado.rotation.x);
    //     requestAnimationFrame(corta1);
    // }
    // else
    // {
    //     if(movimentoMachado.rotation.x>0)
    //     {
    //         console.log("2");   
    //         requestAnimationFrame(corta2);
    //     }
    //     else 
    //     acabou=1;
        
    // }
    
}
var corte=false;
var conta = 0;
function CortarArvore(){
    //console.log(!MaoMachado);
    corte=false;
    if(!MaoMachado)
    {  
        conta=0
        var iteracao=0;
        AllTreesPosition.forEach(element => {
            var splite = element.split(" ");
            var first = splite[0];
            var second = splite[1];
            var dx= rayCaster.ray.origin.x - first;
            var dz= rayCaster.ray.origin.z - second;
            var distanceColision= Math.sqrt(dx*dx+dz*dz);
            // console.log(distanceColision);
            // console.log(cameraRadius - (-TreesRadius[iteracao]));
            // console.log(distanceColision<= cameraRadius-(-0.05)  - (-TreesRadius[iteracao]));
            if(distanceColision<= cameraRadius-(-0.05) - (-TreesRadius[iteracao]))
            {
                corte=true;   
                             
            }
            if(!corte)
                conta++;
            iteracao++;
         });
         if(corte)
         {
            TreeFalling();
         }
    }
}

function TreeFalling(){
    //TreeFallAnimation(conta);
    
    comecou=true;
    
    //console.log(conta);
}

function TreeFallAnimation(conta){
    
    

    arrayTrees[conta].rotation.x-= 0.01;
    arrayTrees[conta].rotation.z-= 0.01;
    arrayTrees[conta].position.y-=0.006;
    /*var offset=new THREE.Vector3(-1,0,-1 );
    //machado.position.lerp(offset, -0.06)

    arrayTrees[conta].position.lerp(offset,0.1);*/
    /*const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( new THREE.Vector3( -1, 0, -1 ), Math.PI / 2 );

    //const vector = new THREE.Vector3( 1, 0, 0 );
    arrayTrees[conta].applyQuaternion( quaternion );*/
    





    //Retirar colisão
}



var cube;
var annie;
var fogo= new THREE.Group();
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}
function CreateFire()
{
    
    var texturefire = new THREE.TextureLoader().load('./Textures/fogo.png');
    annie= new TextureAnimator(texturefire,10,1,10,150);
    var geometryfire = new THREE.PlaneGeometry( 0.1,0.1 );
    var materialfire = new THREE.MeshBasicMaterial( {map:texturefire, side:THREE.DoubleSide, transparent:true} );
    cube = new THREE.Mesh( geometryfire, materialfire );
    //cube.position.y=-0.3
    // fire= new Fire(cube,{
    //     textureWidth:512,
    //     textureHeight:512,
    //     debug: false
    // });
    // fire.position.z=0;
    var frente= cube.clone();
    var tras= cube.clone(); 
    tras.rotation.y=1.5;
    fogo.add(tras,frente);
    var escalfogo = 2.5;
    fogo.scale.set(escalfogo,escalfogo,escalfogo);
    fogo.position.y=-0.28
    //cena.add(fogo);    



    //Add light to fire
    AddFirePitLight(fogo.position.x, fogo.position.y, fogo.position.z)
}
function animate() 
{
    requestAnimationFrame( animate );
}


function AddObjetos()
{
    CreateFire();
    CreateSeat();
    CreateTree();
    CreateAxe();
}
// //Inicializacao do braco
// var radiusTop =  0.1;  
// var radiusBottom =  0.1;  
// var height =  0.4;  
// var radialSegments = 50;  
// var geometriaBraco = new THREE.CylinderGeometry(
//     radiusTop, radiusBottom, height, radialSegments);
// var materialBraco = new THREE.MeshStandardMaterial( {color: '#cd853f'} );
// var braco = new THREE.Mesh(geometriaBraco, materialBraco);
// //Fim do braco

// //Inicializacao do pulso
// const radius =  0.1;  
// const detail = 5;  
// const geometriaPulso = new THREE.DodecahedronGeometry(radius, detail);
// var pulso = new THREE.Mesh(geometriaPulso, materialBraco);
// //Fim do pulso

// //Inicializacao dos dedos
// var polegar = new THREE.Mesh(geometriaBraco, materialBraco);
// var indicador = new THREE.Mesh(geometriaBraco, materialBraco);
// var meio = new THREE.Mesh(geometriaBraco, materialBraco);
// var anelar = new THREE.Mesh(geometriaBraco, materialBraco);
// var mindinho = new THREE.Mesh(geometriaBraco, materialBraco);
// //Fim dos dedos

// function ConfigureArm()
// {
//     //braco
//     braco.position.z=5.8;
//     braco.rotation.x=Math.PI*0.35;
//     braco.rotation.z=Math.PI*0.90;
//     braco.position.x=0.03;
//     braco.scale.x=0.1;
//     braco.scale.y=0.1;
//     braco.scale.z=0.1;
//     cena.add(braco);

//     //pulso
//     pulso.position.z=5.775;
//     pulso.position.x=0.025;
//     pulso.position.y=-0.011
//     pulso.scale.x=0.1;
//     pulso.scale.y=0.1;
//     pulso.scale.z=0.1;
//     cena.add(pulso);

//     //dedos
//     polegar.position.z=5.772;
//     polegar.position.x=0.025;
//     polegar.position.y=-0.1
//     polegar.scale.x=0.001;
//     polegar.scale.y=0.001;
//     polegar.scale.z=0.001;
//     cena.add(polegar);

// }

function createFlashlight(){

    //Cylinder
    const cylinderRadiusTop = 0.1;  
    const cylinderRadiusBottom = 0.1;  
    const cylinderHeight = 0.7; 
    const cylinderRadialSegments = 12;  
    const cylinderGeometry = new THREE.CylinderGeometry(
        cylinderRadiusTop, cylinderRadiusBottom, cylinderHeight, cylinderRadialSegments);
    
    var materialCylinder = new THREE.MeshPhongMaterial({ color: 0x020202 });
    //materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
    //materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump2.png');
    var cylinder = new THREE.Mesh(cylinderGeometry, materialCylinder);
    cylinder.position.set(0, 0.3, 0);

    //cone
    const coneRadius =  0.2;  
    const coneHeight =  0.32;  
    const coneRadialSegments = 14;  
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, coneRadialSegments);
    
    var materialCone = new THREE.MeshPhongMaterial({ color: 0x020202 });
    //materialTronco.normalMap = new THREE.TextureLoader().load('./Textures/treeNormal.png');
    //materialTronco.bumpMap = new THREE.TextureLoader().load('./Textures/treeBump2.png');
    var cone = new THREE.Mesh(coneGeometry, materialCone);

    const circleRadius = coneRadius - 0.01;  
    const circleSegments = 15;  
    const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);
    var materialCirculo = new THREE.MeshPhongMaterial({ color: 0xffffff });
    var circulo = new THREE.Mesh(circleGeometry, materialCirculo);

    circulo.rotation.x = Math.PI/2;   
    circulo.position.y = -0.17;    
    //agrupar

    //cena.add(circulo);
    
    //Imaginary invisible object to light look up
    const objectRadius = 0.01;  
    const objectSegments = 15;  
    const objectGeometry = new THREE.CircleGeometry(objectRadius, objectSegments);
    var materialObject = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.80 });
    var objectFlashLight = new THREE.Mesh(objectGeometry, materialObject);
    objectFlashLight.position.y = -0.2;

    lanterna.add(cone, cylinder, circulo);

    
    lightTarget.position.set(0, -0.10, 0);
    lanterna.add(lightTarget);

    lanterna.rotation.x = Math.PI/2;
    lanterna.scale.set(0.1, 0.1, 0.1);
    cena.add(lanterna);
    //lanterna.position.set(0, 0, -1);

    boneco.add(lanterna);
    lanterna.position.set(-0.1,-0.05,-0.2);
    //Give Light
    AtualizaLanternaPosition();
}