import { scheduleShow } from "./show";
import { scheduleFetchByDay } from "../../service/schedule-fetch-by-day";
import { hoursLoad } from "../form/hours-load";

// Seleciona o input de data  
const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  // Obtém a data do imput
  const date =  selectedDate.value

  // Buscar na API os agendamentos para carregar do lado direito da tela.
  const dailySchedules = await scheduleFetchByDay({ date })

  scheduleShow({ dailySchedules})
  // Renderiza as horas disponíveis
  hoursLoad({ date, dailySchedules })
}