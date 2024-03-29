import axios from "axios"

class AuthApi {
    async autenticar(login, senha) {
        const data = await axios.post(
            `${process.env.VUE_APP_BASE_API_URL}/api/v1/sessoes/autenticar/`,
            {
                login,
                senha
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
        return data.headers["authorization"]
    }
}

export default AuthApi;