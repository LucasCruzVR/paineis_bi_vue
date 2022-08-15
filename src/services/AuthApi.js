import axios from "axios"

class AuthApi {
    async autenticar(login, senha) {
        const data = await axios.post(
            `http://localhost:3000/api/v1/sessoes/autenticar/`,
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