import { scheduleCancel } from "../../service/schedule-cancel"
import { schedulesDay } from "./load"

// Captura todas as listas que contém os agendamento
const periods = document.querySelectorAll(".period")

// Gera evento de click para cada lista
periods.forEach((period) => {
    // Captura o evento de click na lista
    period.addEventListener("click", async (event) => {
        //Verifica se o click foi no icone de cancelar
        if (event.target.classList.contains("cancel-icon")) {
           // Obtém a li pai do elemento clicado 
            const item = event.target.closest("li")

            // Pega o id do atributo data-id do elemento
           const { id } = item.dataset 

            // Verifica se o id existe
            if (id) {
                // Abre uma janela de confirmação no browser. Retorna true se clicar em ok, e false se clicar em Cancel
                const isConfirm = confirm("tem certeza que dejesa cancelar o agendamento")
                
                if (isConfirm) {
                    // Chama a função da API pra remover o agendamento
                    await scheduleCancel({ id })

                    // Recarregar os horários e agendamentos
                    await schedulesDay()
                }
            }
        }
    })
})