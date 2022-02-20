<script>
  import { onMount } from "svelte";
  import { findById, findByComment, getPhotos } from "../scripts/photos";
  import { images } from "./ImageModal/stores.js";
  import Gallery from "svelte-image-gallery";
  import { writable } from "svelte/store";
  import Modal from "svelte-simple-modal";
  import Popup from "./ImageModal/Popup.svelte";
  import { imageShowingIndex } from "./ImageModal/stores";

  let comment;
  let id;
  const modal = writable(null);
  const showModal = (e) => {
    $imageShowingIndex = $images.findIndex(
      (element) =>
        `http://localhost:8080/images/${element.filename}` === e.detail.src
    );
    modal.set(Popup);
  };
  onMount(async () => {
    const response = await getPhotos();
    $images = [...response];
    console.log({ $images });
  });

  const getByComment = async () => {
    let response = await findByComment(comment);
    console.log({ response });
    images.update((images) => {
      return (images = [...response]);
    });
  };
  const getById = async () => {
    let response = await findById(id);
    console.log({ response });
    images.update((images) => {
      return (images = [...response]);
    });
  };

</script>


<Modal show={$modal} styleWindow={{ width: "60%", display:"block"}}>
  {#if $images.length}
    <section>
      <h1>Mes photos</h1>
      <input
        type="text"
        name="filter"
        bind:value={comment}
        placeholder="Rechercher"
      />
      <button class="primary" on:click={getByComment}
        >Rechercher parmi les commentaires</button
      >
      <div class="galerie">
        <Gallery gap="60" on:click={showModal}>
          {#each $images as image}
            <img
              src={`http://localhost:8080/images/${image.filename}`}
              alt={image.title}
            />
          {/each}
        </Gallery>
      </div>
    </section>
  {:else}
    <p>Ajouter une photo à votre galerie</p>
  {/if}
</Modal>


<style>
  section {
    margin-left: 25%;
  }
  h1{
    margin-left: 30%;
    font-size: xx-large;
    color:blueviolet;
  }
  .galerie {
    margin-top: 50px;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    align-content: center;
    width: 1000px;
  }
  :global(body) {
    margin: 0px;
    font-family: "segoe ui";
    background-color: lightblue;
  }
  button {
    margin-left: 10px;
    border: 2px solid magenta;
    transition-duration: 0.4s;
  }
  input{
    margin-left: 20%;
    border: 2px solid magenta;
  }
  button:hover {
    background-color: magenta;
    color: white;
  }
  img {
    opacity: 0.9;
    transition: all 0.2s;
  }
  img:hover {
    opacity: 1;
    transform: scale(1.32);
  }
</style>
