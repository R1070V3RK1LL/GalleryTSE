<script>
	export let slideNumber;
	export let slideTotal;
	export let image;
	export let altTag;
	export let title;
</script>

<!-- Images numérotées -->
<div class="mySlides">
	<div class="slidenumber">{slideNumber} / {slideTotal}</div>
	<img src={image} alt={altTag} title={title} class="img-responsive" />
</div>

<style>
	/* Numéro de diapositive */
	.slidenumber {
		color: #fffb00;
		font-size: 0.9rem;
		padding: 8px 12px;
		text-shadow: 1px 1px black;
		position: absolute;
		top: 0;
	}

	img {
		width:100%;
		height:auto;
	}
	.img-responsive {
		margin: 0 auto;
	}
</style>
