import Api from "./Api";

//récupèrer toutes les photos

export const getPhotos = async () => {
  try {
    const response = await Api.get("/");
    return response;
  } catch (error) {
    console.error("Error: ", error);
  }
};

//supprimer une photo

export const deletePhoto = async (fileId) => {
  try {
    console.log({
      fileId
    })
    const response = await Api.delete(`/${fileId}`)
    console.log("delete response", response)
  } catch (error) {
    console.log(error)
    throw error;
  }
}

//commenter une photo
export const commentPhoto = async (fileId, payload) => {
  try {
    console.log({
      fileId
    })
    console.log({
      payload
    })
    const response = await Api.post(`/${fileId}/comment`, payload)
    console.log("comment response", response)
  } catch (error) {
    console.log(error)
    throw error;
  }
}
//rechercher une ou plusieurs photo(s) à partir d'un commentaire
export const findByComment = async (comment) => {
  try {
    const response = await Api.get(`/comment`, {
      params: {
        comment
      }
    })
    console.log("find by comment response", response)
    return response
  } catch (error) {
    console.log(error)
    throw error;
  }
}

//rechercher une photo par id
export const findById = async (fileId) => {
  try {
    const response = await Api.get(`/${fileId}`)
    console.log("find by id response", response)
    return response
  } catch (error) {
    console.log(error)
    throw error;
  }
}