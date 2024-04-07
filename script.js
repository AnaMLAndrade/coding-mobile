//api gatinhos
const plushImage = document.getElementById('plushImage');
    const newPlushButton = document.getElementById('newPlushButton');

    function fetchNewPlush() {
      fetch('https://pixabay.com/api/?key=43247744-b5381ab6a58667a7ffa5b9300&q=plush-toy&image_type=photo')
        .then(response => response.json())
        .then(data => {
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const imageUrl = data.hits[randomIndex].largeImageURL;
          plushImage.src = imageUrl;
        })
        .catch(error => {
          console.error('Erro ao buscar imagem de pelúcia:', error);
        });
    }

    newPlushButton.addEventListener('click', fetchNewPlush);

    fetchNewPlush();

//audio

  const audio = document.getElementById('audioPlayer');
  const button = document.getElementById('newPlushButton');

  button.addEventListener('click', function() {
      audio.play();
  });


  //mapa

// Constante para a chave da API
const key = 'FR9rIjF4Gqbk4QmUDKAh';

// Inicialização da fonte TileJSON
const source = new ol.source.TileJSON({
  url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
  tileSize: 512,
  crossOrigin: 'anonymous'
});

// Inicialização do mapa
const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([16.62662018, 49.2125578]),
    zoom: 15
  })
});

// Estilo para o marcador (bola vermelha)
const markerStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({ color: 'lightblue' }),
    stroke: new ol.style.Stroke({ color: 'black', width: 1 })
  })
});

// Camada para os marcadores
const markerLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: markerStyle
});
map.addLayer(markerLayer);

// Função para adicionar um marcador na posição especificada
function addMarker(coordinates) {
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(coordinates)
  });
  markerLayer.getSource().addFeature(marker);
}

// Função para obter a localização do usuário
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Função para mostrar a posição atual no mapa
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Atualizar a visualização do mapa com as novas coordenadas
  map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));

  // Adicionar um marcador na posição atual
  addMarker(ol.proj.fromLonLat([longitude, latitude]));
}

// Chamar a função para obter a localização do usuário quando a página carregar
getLocation();
