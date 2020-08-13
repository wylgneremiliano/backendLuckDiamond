const connection = require('../database/connection')
const cryptoRandomString = require('crypto-random-string');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('user').count()
        const user = await connection
            .select()
            .from('user')
            .timeout(1000, { cancel: true })
            .limit(5)
            .offset((page - 1) * 5)
        response.header('X-Total-Count', count['count(*)'])
        return response.json({ user, count })
    },
    async create(request, response) {
        const { email, last_name, first_name, full_name, photo_url } = request.body
        const code_invite = cryptoRandomString({ length: 7, type: 'distinguishable' })
        try {
            const [contentUser] = await connection('user').where('email', email).count()
            if (contentUser['count(*)'] === 0) {
                const user = await connection('user').insert({
                    email,
                    last_name,
                    first_name,
                    full_name,
                    photo_url,
                    code_invite
                })
                return response.status(200).json({ "mensagem": "Usuário inserido com sucesso!", "error": false })
            }
            return response.status(200).json({ "mensagem": "Usuário Logado com sucesso!", "error": false })

        } catch (error) {
            return response.status(500).json({ "mensagem": "Erro ao inserir usuário!", "error": true })
        }

    },
    async show(request, response) {
        const email = request.params.email
        try {
            const user = await connection('user').select('*').where('email', email)
            console.log(user)
            return response.status(200).json({ "user": user, "error": false })
        } catch (error) {
            return response.status(500).json({ "mensagem": "Erro ao consultar usuário!", "error": true })
        }

    },

    async updateCoins(request, response) {
        const { email, diamonds } = request.body
        try {
            const resp = await connection('user')
                .update({diamonds: diamonds}, ['id', 'diamonds'])
                .where('email', email)
            console.log(resp)
            return response.status(200).json({ "user": resp, "error": false })
        } catch (error) {
            return response.status(500).json({ "mensagem": "Erro ao adicionar diamantes!", "error": true })
        }
    }


}
