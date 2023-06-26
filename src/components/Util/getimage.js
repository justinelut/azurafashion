export const imageurl = (collectionId, id, filename) => {
    return process.env.NEXT_PUBLIC_API_FILES_URL+'/'+collectionId+'/'+id+'/'+filename
}