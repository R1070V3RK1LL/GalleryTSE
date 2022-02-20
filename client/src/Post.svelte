<script>
  import FilePond, { registerPlugin, supported } from "svelte-filepond";
  import { deletePhoto } from "../scripts/photos";
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import { navigate } from "svelte-routing";

  // Enregistrer les plugins
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  let pond;



  const handleRemove = async (fileId) => {
    const { imageId } = JSON.parse(fileId);
    try {
      const res = await deletePhoto(imageId);
    } catch (e) {
      console.error("Error", e);
    }
  };
  const handleFinish = () => {
    if (pond.getFiles().length != 0) {
    pond.removeFiles()
  }
  navigate("/display-photos", { replace: true });
  }
</script>

<div class="post-card">
  <FilePond
    class="filepond--root"
    bind:this={pond}
    name="photo"
    server={{
      url: "http://localhost:8080/api/photos",
      revert: handleRemove,
      remove: handleRemove,
    }}
    allowMultiple={true}
    dropOnPage={true}
    dropValidation={true}
  />
</div>
<button on:click={handleFinish}>Enregistrer</button>

<style>
.post-card{
  width:60%;
  height:auto;
  margin-top: 100px;
  margin-left:20%;
}
button{
  margin-left:48%;
  border: 2px solid #4CAF50;
  transition-duration:0.4s;
  width:100px;
}
button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}
</style>