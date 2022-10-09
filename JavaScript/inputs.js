var relogio = new THREE.Clock();
var controls;
var controlsEnable = false;
var AndarFrente = false;
var AndarTras = false;
var AndarEsq = false;
var AndarDir = false;
var MaoMachado = true;
var firstPerson = true;
var vetorVelocidade; 
var VelocidadeJogador = 100.0;
var DistanciaColisao = 0.001;
var matrizColisao = [];   
var xAnterior;
var zAnterior;

//Inicialização de variáveis para o movimento
const direction = new THREE.Vector3;
let speed = 0.05;
let rotation = 0.01;

function InputRato() {
  document.onclick = function () {
    container.requestPointerLock();
  }
    document.addEventListener('pointerlockchange', MudancaBloqueio, false); // detetar qd o jogador ativa ou desativa o bloqueio 
}
  
function MudancaBloqueio() {
    // ativa ou desativa os controlos
    if (document.pointerLockElement === container) {
      controls.enabled = true;
    }
}
  
function MoverTeclas() {
    // Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada
    document.addEventListener('keydown', ev =>  {
      // Verifica se a tecla W foi premida - avança 
      if(ev.keyCode == 87)
        AndarFrente = true;
  
    // Verifica se a tecla S foi premida - recua
      if(ev.keyCode == 83)
        AndarTras = true;
  
    // Verifica se a tecla A foi premida - esquerda
      if(ev.keyCode == 65)
        AndarEsq = true;
  
      // Verifica se a tecla D foi premida - direita
      if(ev.keyCode == 68)
        AndarDir= true;
      //mudar camara
        if(ev.keyCode == 86) // Verifica se a tecla V foi premida
          if(firstPerson)
            firstPerson=false;
          else
            firstPerson=true;
      //animacao machado
      if(ev.keyCode == 81) // Verifica se a tecla Q foi premida
        if(MaoMachado)
        {
          MaoMachado=false;
        }
         
        else
        {
          MaoMachado=true;
        }
          
      if(ev.keyCode == 69) // Verifica se a tecla E foi premida
      {
        CortarArvore();
        cortar=true;
      }
        

      if(ev.keyCode == 76) // Verifica se a tecla L foi premida
      {
        lanternaLigada = !lanternaLigada;
      }
        
      if(ev.keyCode == 74) // Verifica se a tecla J foi premida
      {
        firePitLight = !firePitLight;
      }
      if(ev.keyCode == 77) // Verifica se a tecla M foi premida
      {
        MoonOn = !MoonOn;
      }
      if(ev.keyCode == 75) // Verifica se a tecla K foi premida
      {
        AmbienteOn= !AmbienteOn;
      }
      if(ev.keyCode == 73) // Verifica se a tecla I foi premida
      {
        skyOn= !skyOn;
      }

    });
  
    // Adicionamos um evento que é desplotado sempre que uma tecla deixar de ser premida
    document.addEventListener('keyup', ev =>  {
  
      // Verifica se a tecla W for solta
      if(ev.keyCode == 87)
        AndarFrente = false;
  
    // Verifica se a tecla S for solta
      if(ev.keyCode == 83)
        AndarTras = false;
  
    // Verifica se a tecla A for solta
      if(ev.keyCode == 65)
        AndarEsq = false;
  
      // Verifica se a tecla D for solta
      if(ev.keyCode == 68)
        AndarDir= false;
    }); 
}

var rayCaster;

function MovimentoJogador(delta) {
    // Vai verificar qual das variaveis do teclado muda para true, assim q houver uma direção, subtrai-se ou adiciona-se p aplicar o movimento nessa direção
    vetorVelocidade = new THREE.Vector3();
    vetorVelocidade.x -= vetorVelocidade.x * 10.0 * delta;
    vetorVelocidade.z -= vetorVelocidade.z * 10.0 * delta;
      // Se nao tá a haver colisao e uma tecla tá a ser premida
      if (detetarColisao() == false ) {
          if (AndarFrente) {
            vetorVelocidade.z -= VelocidadeJogador * delta;
          }
          if (AndarTras) {
            vetorVelocidade.z += VelocidadeJogador * delta;
          } 
          if (AndarEsq) {
            vetorVelocidade.x -= VelocidadeJogador * delta;
          }
          if (AndarDir) {
            vetorVelocidade.x += VelocidadeJogador * delta;
          }
  
          controls.getObject().translateX(vetorVelocidade.x * delta);
          controls.getObject().translateZ(vetorVelocidade.z * delta);          
          camaraPerspetive.position = controls.getObject().position;
          // if(objetoImportado != null)
          // {
          //   objetoImportado.position = controls.getObject().position;
          // }
      } else {
          // Colisão ou não ha nenhuma tecla premida vai parar o movimento
          vetorVelocidade.x = 0;
          vetorVelocidade.z = 0;
      }
}
var direcaoLuz;
function detetarColisao()
{
  var rotationMatrix;

  // Obter direção da camara
  var DirecaoCamara = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
  // Ve a direção q nos tamos a mover
  if (AndarTras) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(GrausToRad(180));
  }
  else if (AndarEsq) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(GrausToRad(90));
  }
  else if (AndarDir) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(GrausToRad(270));
  }

  if (rotationMatrix !== undefined) {
    DirecaoCamara.applyMatrix4(rotationMatrix);
  }
  
  // Aplicar um raycaster p camara
  rayCaster = new THREE.Raycaster(controls.getObject().position, DirecaoCamara);
  //console.log(rayCaster);
  var iteracao=0;
  var int = 0;
  var colisao=false;
  AllTreesPosition.forEach(element => {
     var splite = element.split(" ");
     var first = splite[0];
     var second = splite[1];
     var dx= rayCaster.ray.origin.x - first;
     var dz= rayCaster.ray.origin.z - second;
     var distanceColision= Math.sqrt(dx*dx+dz*dz);
     if(distanceColision< cameraRadius + TreesRadius[iteracao] )
      colisao= true; 
     iteracao++;
  });
  if(!colisao)
  AllSeatsPosition.forEach(element => {
    var splite = element.split(" ");
     var first = splite[0];//x
     var second = splite[1];//z
     var splitSeat= SeatsSize[int].split(" ");
     var ALTSeat = splitSeat[0];//comprimento
     var LARSeat = splitSeat[1];//largura
     var endRayX = rayCaster.ray.origin.x;
     var endRayZ =rayCaster.ray.origin.z;
     
     if(first!=0 )
      {
          if(endRayX < first-(-LARSeat) && endRayX > first-LARSeat && endRayZ < second-(-ALTSeat/2) && endRayZ > second-(ALTSeat/2))
            colisao= true; 
      }
      else
      {
        //console.log(ALTSeat);
            if(endRayX < first-(-ALTSeat/2) && endRayX > first-ALTSeat/2 && endRayZ < second-(-LARSeat) && endRayZ > second-(LARSeat))
              colisao= true; 
        
      }

      int++;
  });
  if(!colisao)
  {
    var dx= rayCaster.ray.origin.x;
    var dz= rayCaster.ray.origin.z;
    var distanceColision= Math.sqrt(dx*dx+dz*dz);
    if(distanceColision < cameraRadius + floorRadius )
      colisao= true; 
  }
  if(colisao)
  {
    //console.log("bateu");
    rayCaster.ray.origin.x=xAnterior;
    rayCaster.ray.origin.z=zAnterior;
  }
  else 
  {
    xAnterior=rayCaster.ray.origin.x;
    zAnterior=rayCaster.ray.origin.z;
    //console.log("n");
  }
  
  return colisao;
  
}


function GrausToRad(graus) {
  return graus * Math.PI / 180;
}