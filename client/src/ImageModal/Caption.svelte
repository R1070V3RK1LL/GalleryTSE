<script>
	import { createEventDispatcher } from 'svelte';
  export let caption;

	const dispatch = createEventDispatcher();
</script>

<style>
/* Conteneur pour la légende de l'image*/
.caption-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
  text-align: center;
  background-color: #222;
	font-size: 1.2rem;
  padding: 2px 16px;
  color: white;
}

/* Boutons précédent et suivant */
.prev,
.next {
  cursor: pointer;
  width: auto;
  color: hsla(125, 86%, 100%, .7);
  font-weight: bold;
  font-size: 2rem;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Au survol, ajout d'un fond derrière les boutons */
.prev:hover,
.next:hover {
  color: gray;
	text-decoration: none;
}

/* Lors du clic, change la couleur des boutons */
.prev:active,
.next:active {
  color: blueviolet;
	text-decoration: none;
}

</style>


<div class="caption-container">
	<!-- Previous Arrow -->
	<a href="#arrowL" class="arrow prev" on:click={() => dispatch('prevClick')}>&#10094;</a>
		<!-- Caption -->
	<p id="caption">{caption}</p>
		<!-- Next Arrow -->
	<a href="#arrowR" class="arrow next" on:click={() => dispatch('nextClick')}>&#10095;</a>
</div>