

module.exports = {

    getAll: function(page, res) {
        return "Abrindo página " + page;
    },

    getOne: async function(id, res) {
        return "Consultando produto de id: " + id;
    },

    insert: async function(data, res) {
        return "Inserindo: " + JSON.stringify(data, null, 2);
    },

    update: async function(id, data, res) {
        return "Mudando dados de: " +id+ " para: " + JSON.stringify(data, null, 2);
    },

    del: async function(id, res) {
        return "Deletando " + id;
    }

}