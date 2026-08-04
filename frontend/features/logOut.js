import api from "../utils/axois"

const logOut = async() => {
  try {
    const {data}=await api.get("/api/auth/logout")
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default logOut