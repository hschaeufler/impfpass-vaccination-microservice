const vaccineRepository = require("../repository/VaccineRepository");

async function getList(){
        return await vaccineRepository.findAll();
}

module.exports = {getList};