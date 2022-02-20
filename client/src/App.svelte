<script>
  import Display from "./Display.svelte";
  import Post from "./Post.svelte";
  import { Router, Route } from "svelte-routing";
  import SlideshowSync from "./ImageModal/SlideshowSync.svelte";
  export let url = "";
</script>

<Router {url}>
  <div class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
      <div class="nav-title nav-links">GalerieTSE</div>
      <img src="https://fleurdheaven.fr/wp-content/uploads/2021/09/fleur.png" alt="logo" >
    </div>

    <div class="nav-links">
      <a href="/afficher-photos">Galerie</a>
      <a href="/diaporama">Diaporama</a>
      <a href="/ajouter-photos">Ajouter une image</a>
    </div>
  </div>

  <Route path="/"><Display /></Route>
  <Route path="/afficher-photos"><Display /></Route>
  <Route path="/ajouter-photos"><Post /></Route>
  <Route path="/diaporama"><SlideshowSync /></Route>
</Router>

<style>

  :global(ul#myMenu li) {
    display: inline;
  }
  * {
    box-sizing: border-box;
  }
  img{
    width:60px;
    height:40px;
}
  img:hover{
    transform:scale(2);
  }
  :global(body) {
    margin: 0px;
    font-family: "segoe ui";
  }
  .nav {
    height: 50px;
    width: 100%;
    background-color: blue;
    position: relative;
  }

  .nav > .nav-header {
    display: inline;
  }

  .nav > .nav-header > .nav-title {
    display: inline-block;
    font-size: 22px;
    color: orangered;
    padding: 0px 10px 10px 10px;
  }

  .nav > .nav-links {
    display: inline;
    float: right;
    font-size: 18px;
  }

  .nav > .nav-links > a {
    display: inline-block;
    padding: 13px 10px 13px 10px;
    text-decoration: none;
    color: orange;
  }

  .nav > .nav-links > a:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .nav > #nav-check {
    display: none;
  }

  @media (max-width: 600px) {
    .nav > .nav-links {
      position: absolute;
      display: block;
      width: 100%;
      background-color: #333;
      height: 0px;
      transition: all 0.3s ease-in;
      overflow-y: hidden;
      top: 50px;
      left: 0px;
    }
    .nav > .nav-links > a {
      display: block;
      width: 100%;
    }
    .nav > #nav-check:not(:checked) ~ .nav-links {
      height: 0px;
    }
    .nav > #nav-check:checked ~ .nav-links {
      height: calc(100vh - 50px);
      overflow-y: auto;
    }
  }
</style>
