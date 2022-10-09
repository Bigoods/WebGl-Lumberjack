//document.addEventListener('DOMContentLoaded', Start);
var cena = new THREE.Scene();
// var canvas = document.querySelector('canvas');
//Settings da camara
var camaraPerspetive = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var camaraAtiva= camaraPerspetive;
var camaraOrthographic = new THREE.OrthographicCamera(-5,5,5,0,-5,5);
camaraPerspetive.rotation.order = 'YXZ';
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 15, window.innerHeight - 15);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild(renderer.domElement);
var movimentoMachado= new THREE.Group();
var boneco = new THREE.Group();
var cortar=false;
var comecou = false;
var userTroncoNumbers=0;


InputRato();
Start();
update();

//Função inicial
function Start(){    
    AddObjetos();
    camaraPerspetive.position.set(0,0,0);
    controls = new THREE.PointerLockControls(camaraPerspetive);
    cena.add(controls.getObject());
    let DirecaoCamara = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
    rayCaster = new THREE.Raycaster(controls.getObject().position, DirecaoCamara);
    rayCaster.ray.origin.set(0,0,0.8);
    MoverTeclas();
    //camaraAtiva=camara2;
    //camara2.position.set(0,1.5,0);
    camaraOrthographic.rotation.x=-Math.PI/2;
    //camara.add(camara2);
    
    //camara2.position.z=2.5;
    movimentoMachado.add(machado);
    machado.position.set(0.07,0.01,-0.2);
    movimentoMachado.position.set(0,0,0);
    cena.add(camaraOrthographic);
    boneco.add(movimentoMachado);
    cena.add(boneco);
    camaraPerspetive.add(boneco);
    //Add scene configurations
    AddScene();
    requestAnimationFrame(update);
}
var delta;
function update(){


    if(remainTime > 0){
        //console.log(arrayTrees)
        document.getElementById("Troncos").innerHTML=userTroncoNumbers;
        delta = relogio.getDelta();
        AllTreesFolhas.forEach(animeTree);
        if(MaoMachado)
            animationAxeCostas();
        else
            animationAxeMao();
        // if(corte && !acabou)
        // {
        //     corta1();
        // }
        // if(corte && !acabou2)
        // {
        //     corta2();
        // }

        MovimentoJogador(delta);
        SkyboxRotation();
        MoonRotation();
        if(firstPerson)
        {
            camaraAtiva= camaraPerspetive;
            controls.enabled = true;
        }
        else
        {
            controls.enabled = true;
            //camara.remove(camara2);
            // camara2.position.set(0,0,2.5);
            // camara2.rotation.set(-Math.PI/2,0,0);
            // camara.position.set(0,0,0);
            // camara.rotation.set(0,0,0);
            
            
            camaraAtiva=camaraOrthographic;
            camaraAtiva.position.x=rayCaster.ray.origin.x;
            camaraAtiva.position.z=rayCaster.ray.origin.z+2;
            
            
        }
        annie.update(1000 * delta);
        if(cortar)
        {
            
            //machado.rotation.z=Math.PI/4;
            machado.rotation.set(0,Math.PI/2,-Math.PI/6);
            animationAxeCortar();


            
        }
        else
        {
            animationAxeVoltar();
            if(cortou)
            {
                machado.rotation.set(0,2,0);
                cortou=false;
            }
        }


        //Animação da árvore a cair
        //console.log(comecou);
        if(comecou){
            //console.log(arrayTrees[conta].position.y);
            
            if(arrayTrees[conta].position.y>-0.35)
            {
                //console.log(arrayTrees[conta].position.y);
                TreeFallAnimation(conta);
                
            }
            if(arrayTrees[conta].position.y<=-0.33){
                //cortou=false;
                comecou = false;
                //cena.remove(arrayTrees[conta]);
                cena.remove(arrayObjRotate[conta]);
                arrayObjRotate.splice(conta,1);
                arrayTrees.splice(conta,1);
                AllTreesPosition.splice(conta,1);
                userTroncoNumbers++;    //Acrescenta tempo 
                remainTime+=10;    //Acresenta tempo
            }
            
                
                
        }


        //Luz da lanterna
        if(lanternaLigada == true){
            AtualizaLanternaPosition();
        }else{
            RemoveLanterna();
        }
        if(MoonOn == true){
            AddMoonLight(moon.position.x,moon.position.y,moon.position.z);
        }else{
            removeMoonLight();
        }
        if(AmbienteOn == true){
            AddAmbientLight();
        }else{
            RemoveAmbientLight();
        }
        //Luz da lareira
        if(firePitLight == true){
            AddFirePitLight(0,0,0);
        }else{
            removeFirePitLight();
        }
        if(skyOn == true){
            addSkyLight();
        }else{
            removeSkyLight();
        }



        //Animação do fire
        //fire.update(performance.now() / 1000);
        //fireanime();
        // renderer.render(cena, camaraAtiva);
        // requestAnimationFrame(update);
    }else if(gameOver == 1){
        //console.log("Apagar a fogueria");
        removeFirePitLight();
        gameOver = 2; //Para não entrar mais 
        
    }    
    else
    controls.enabled=false;
    renderer.render(cena, camaraAtiva);
    requestAnimationFrame(update);
}

function reset()
{
    location.reload();

}

var remainTime = 11;
var gameOver = 0;
// Update the count down every 1 second
var countdown = setInterval(function() {

    if(remainTime > 0){
        remainTime--;
        document.getElementById("time").innerHTML = "Tempo restante: " + remainTime;    
    }else{
        clearInterval(countdown);
        document.getElementById("time").innerHTML = "Tempo restante: " + remainTime;
        document.getElementById("gameOver").innerHTML = "Game Over";
        document.getElementById("gameOverBtn").style.display="inline";
        gameOver = 1;
    }
    //document.getElementById("time").innerHTML = document.getElementById("time").innerHTML - 1 + "s";
  // If the count down is finished, write some text

}, 1000);













