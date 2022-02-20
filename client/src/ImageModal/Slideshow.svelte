<script>
  import { images, imageShowingIndex } from "./stores.js";
  import Slide from "./Slide.svelte";
  import Modal from "svelte-simple-modal";
  import CommentPopup from "./CommentPopup.svelte";
  import Caption from "./Caption.svelte";
  import { deletePhoto } from "../../scripts/photos";
  import { Link } from "svelte-routing";
  import { writable } from "svelte/store";

  const commentModal = writable(null);

  const showCommentModal = (e) => {
    commentModal.set(CommentPopup);
  };

  const supprimerPhoto = async () => {
    if ($images.length) {
      let picture = $images[$imageShowingIndex];
      console.log({ picture });
      try {
        const res = await deletePhoto(picture._id);
      } catch (e) {
        console.error("Error", e);
      }
      images.update((images) => {
        images.splice($imageShowingIndex, 1);
        return (images = [...images]);
      });
      if ($imageShowingIndex <= $images.length) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };
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

<Modal show={$commentModal}>
  {#if $images.length}
    <main>
      <!-- image gallery -->
      <div class="container">
        <Slide
          image={`http://localhost:8080/images/${image.filename || undefined}`}
          altTag={image.title}
          slideNumber={$imageShowingIndex + 1}
          slideTotal={$images.length}
          title={image.title}
        />
      </div>

      <!-- Image text -->
      <Caption
        caption={image.comment}
        on:prevClick={prevSlide}
        on:nextClick={nextSlide}
      />

      <button on:click={showCommentModal}
        ><Link to="/display-photos" /> Ajouter/modifier le commentaire</button
      >
      <button on:click={supprimerPhoto}> Supprimer la photo</button>
    </main>
  {:else}
    <p>Aucune photo n'a été trouvée</p>
  {/if}
</Modal>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Josefin Sans", sans-serif;
  }
  p{
    margin-top: 10%;
    margin-left: 30%;
    font-size: x-large;
    color: red;
  }
  main {
    width:70%;
    display: flex;
    flex-direction: column;
    background-color: #222;
  }
  button {
    border: 2px solid blueviolet;
    transition-duration: 0.4s;
  }
  button:hover {
    background-color: blueviolet;
    color: white;
  }
  /* Position du conteneur */
  .container {
    position: relative;
  }
</style>
