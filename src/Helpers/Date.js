
const DateHelper = {

    currentFullTime() {
        return new Date().toLocaleString('pt-BR', {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: '2-digit'
        })
    },

    currentDate() {
        return new Date().toLocaleString("as-IN", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        })
    },

    currentTime() {
        return new Date().toLocaleString("as-IN", {
            hour: "numeric",
            minute: "2-digit",
            second: '2-digit'
        })
    },

    monthNameByNumber(monthNumber) {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

        if (monthNumber >= 0 && monthNumber < 12) {
            return monthNames[monthNumber]
        }

        throw new Error('DateHelper::monthNameByNumber monthNumber out of bounds')
    },
}

module.exports = DateHelper