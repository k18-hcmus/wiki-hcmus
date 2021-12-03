import axios from 'axios'
export const uploadInlineImageForArticle = async (file) => {
  const headers = await this.getAuthHeader()
  const formData = new FormData()
  formData.append('files', file)
  try {
    let { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      formData,
      {
        headers: headers,
      }
    )
    return data
  } catch (e) {
    console.log('caught error')
    console.error(e)
    return null
  }
}
