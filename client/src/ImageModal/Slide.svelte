<script>
	export let slideNo;
	export let totalSlides;
	export let image;
	export let altTag;
	export let attr;
</script>

<!-- Images numérotées -->
<div class="mySlides">
	<div class="slidenumber">{slideNo} / {totalSlides}</div>
	<img src={image} alt={altTag} title={attr} class="img-responsive" />
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
		width: 100%;
		height: 50%;
	}
	.img-responsive {
		margin: 0 auto;
	}
</style>
