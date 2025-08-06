function mostrarSeccion(id) {
  document.getElementById("seccionGaleria").style.display = "none";
  document.getElementById("seccionClima").style.display = "none";
  document.getElementById("seccionPokedex").style.display = "none";

  document.getElementById(id).style.display = "block";
}

document.getElementById("btnMostrarGaleria").addEventListener("click", () => {
  mostrarSeccion("seccionGaleria");
  cargarGaleriaPexels();
});

document.getElementById("btnMostrarClima").addEventListener("click", () => {
  mostrarSeccion("seccionClima");
});

document.getElementById("btnMostrarPokedex").addEventListener("click", () => {
  mostrarSeccion("seccionPokedex");
});

function ocultarSecciones() {
      document.getElementById('seccionGaleria').className = 'seccion-oculta mb-5 w-100';
      document.getElementById('seccionClima').className = 'seccion-oculta mb-5 w-100';
      document.getElementById('seccionPokedex').className = 'seccion-oculta w-100 mb-5';
    }

    document.getElementById('btnMostrarGaleria').onclick = function() {
      ocultarSecciones();
      document.getElementById('seccionGaleria').className = 'seccion-visible mb-5 w-100';
    };
    document.getElementById('btnMostrarClima').onclick = function() {
      ocultarSecciones();
      document.getElementById('seccionClima').className = 'seccion-visible mb-5 w-100';
    };
    document.getElementById('btnMostrarPokedex').onclick = function() {
      ocultarSecciones();
      document.getElementById('seccionPokedex').className = 'seccion-visible w-100 mb-5';
    };

async function cargarGaleriaPexels() {
  try {
    const apiKey = "thRKVzBw87PHvINWq9PjjVmE89KoByywQwNUAFvqREhF2udRqrv0N01t";
    const tema = "Playa"; // Puedes cambiar el tema aquí
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(tema)}&per_page=10&locale=es-ES`;

    const respuesta = await fetch(url, {
      headers: { Authorization: apiKey }
    });

    const datos = await respuesta.json();
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    datos.photos.forEach(foto => {
      galeria.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${foto.src.medium}" class="card-img-top" alt="${foto.alt}">
            <div class="card-body">
              <p class="card-text">${foto.alt}</p>
              <p class="text-muted small">Fotografo ${foto.photographer}</p>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error al cargar la imagen", error);
  }
}


document.getElementById("btnClima").addEventListener("click", () => {
  obtenerClima();
});

async function obtenerClima() {
  try {
    const ciudad = document.getElementById("ciudad").value.trim();
    const apiKey = "835ecb6931717b52de6f7570b8457030";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.cod !== 200) {
      throw new Error(datos.message || "No registra ciudad");
    }

    document.getElementById("climaResultado").innerHTML = `
      <div class="text-center">
        <h4 class="mb-2">${datos.name}</h4>
        <p class="mb-1"><strong>Temperatura:</strong> ${datos.main.temp} °C</p>
        <p class="mb-0"><strong>Clima:</strong> ${datos.weather[0].description}</p>
      </div>
    `;
  } catch (error) {
    document.getElementById("climaResultado").innerHTML = `<p class="text-danger text-center">⚠️ ${error.message}</p>`;
  }
}

// POKEMON
document.getElementById("btnPokedex").addEventListener("click", () => {
  obtenerPokemon();
});

async function obtenerPokemon() {
  try {
    const nombre = document.getElementById("pokemon").value.toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Pokémon no encontrado");

    const datos = await respuesta.json();

    document.getElementById("pokedexResultado").innerHTML = `
      <div class="text-center">
        <h4 class="mb-2">${datos.name.toUpperCase()}</h4>
        <img src="${datos.sprites.front_default}" alt="${datos.name}" class="mb-2">
        <p class="mb-1"><strong>Altura:</strong> ${datos.height}</p>
        <p class="mb-1"><strong>Peso:</strong> ${datos.weight}</p>
        <p class="mb-0"><strong>Habilidades:</strong> ${datos.abilities.map(h => h.ability.name).join(", ")}</p>
      </div>
    `;
  } catch (error) {
    document.getElementById("pokedexResultado").innerHTML = `<p class="text-danger text-center">⚠️ ${error.message}</p>`;
  }
}