<script>
  import { images, imageShowingIndex } from "./stores.js";
  import Slide from "./Slide.svelte";
  import Caption from "./Caption.svelte";
  import { getPhotos } from "../../scripts/photos.js";
  import { onMount } from "svelte";

  onMount(async () => {
    const response = await getPhotos();
    $images = [...response];
    console.log({ $images });
  });

  /* Image à afficher */
  $: console.log({ $images });
  $: image = $images[$imageShowingIndex];

  const nextSlide = () => {
    if ($imageShowingIndex === $images.length - 1) {
      $imageShowingIndex = 0;
    } else {
      $imageShowingIndex += 1;
    }
  };

  const prevSlide = () => {
    if ($imageShowingIndex === 0) {
      $imageShowingIndex = $images.length - 1;
    } else {
      $imageShowingIndex -= 1;
    }
  };

  export const goToSlide = (number) => ($imageShowingIndex = number);
</script>


{#if $images.length}
  <main>
    <!-- galerie d'images -->
    <div class="container">
      <Slide
        image={`http://localhost:8080/images/${image.filename || ""}`}
        altTag={image.title}
        slideNo={$imageShowingIndex + 1}
        totalSlides={$images.length}
        attr={image.title}
      />
    </div>

    <!-- Légende de l'image -->
    <Caption
      caption={image.comment}
      on:prevClick={prevSlide}
      on:nextClick={nextSlide}
    />
  </main>
{:else}
  <p>Aucune photo n'a été trouvée</p>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Josefin Sans", sans-serif;
  }
  p{
    margin-top: 10%;
    margin-left:40%;
    font-size: x-large;
    color:red ;
  }
  main {
    width: 70vw;
    display: flex;
    flex-direction: column;
    margin: 10% auto;
    background-color: #222;
    box-shadow: 0 0 10px black;
  }

  /* Position du conteneur de l'image */
  .container {
    position: relative;
    width: 100%;
  }
</style>
